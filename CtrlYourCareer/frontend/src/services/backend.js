const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000/api";

function getToken() {
  try {
    const session = JSON.parse(
      localStorage.getItem("cyc_demo_session") || "null",
    );

    // Demo tokens are not valid Flask JWTs.
    if (!session?.token || session.token.startsWith("demo-")) {
      return null;
    }

    return session.token;
  } catch {
    return null;
  }
}

async function apiRequest(endpoint, options = {}) {
  const token = getToken();

  let response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error(
      "Cannot connect to Flask. Check that the backend is running.",
    );
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        data?.msg ||
        `Request failed: ${response.status}`,
    );
  }

  return data;
}

export const backendApi = {
  health: () => apiRequest("/health"),
  getSkills: () => apiRequest("/skills"),
  getCareers: () => apiRequest("/careers"),
};
