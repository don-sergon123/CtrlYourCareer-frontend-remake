import { createContext, useContext, useEffect, useState } from "react";
import { api, demo } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const stored = api.getSession();
    if (!stored?.token) {
      setLoading(false);
      return;
    }
    api
      .me(stored.token)
      .then(({ user }) => {
        if (!active) return;
        const refreshed = { token: stored.token, user };
        api.saveSession(refreshed);
        setSession(refreshed);
      })
      .catch(() => {
        if (active) api.logout();
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function login(email, password) {
    const next = await api.login({ email, password });
    api.saveSession(next);
    setSession(next);
    return next;
  }

  function updateUser(user) {
    setSession((current) => {
      if (!current) return current;
      const next = { ...current, user };
      api.saveSession(next);
      return next;
    });
  }

  function logout() {
    api.logout();
    setSession(null);
  }

  return (
    <AuthContext.Provider
      value={{ session, loading, login, logout, updateUser, demo }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
