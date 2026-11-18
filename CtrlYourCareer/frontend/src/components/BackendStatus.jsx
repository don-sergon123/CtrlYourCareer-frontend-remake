import { useEffect, useState } from "react";
import { backendApi } from "../services/backend";

export default function BackendStatus() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    backendApi
      .health()
      .then(() => setStatus("connected"))
      .catch(() => setStatus("disconnected"));
  }, []);

  return (
    <div className="backend-status">
      {status === "checking" && <span>Checking backend connection...</span>}

      {status === "connected" && (
        <span style={{ color: "#10b981" }}>● Flask backend connected</span>
      )}

      {status === "disconnected" && (
        <span style={{ color: "#ef4444" }}>● Flask backend disconnected</span>
      )}
    </div>
  );
}
