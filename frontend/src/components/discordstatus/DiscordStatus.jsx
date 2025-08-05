import React, { useEffect, useState } from "react";
import API from "../../services/api";

const DiscordStatus = () => {
  const [status, setStatus] = useState("Checking...");
  const [lastAlert, setLastAlert] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await API.get("/discord-status");
        setStatus(res.data.status === "connected" ? "🟢 Connected" : "🔴 Not Connected");
        setLastAlert(res.data.lastAlert || null);
      } catch (err) {
        console.error("Failed to fetch Discord status");
        setStatus("🔴 Error");
      }
    }; 

    fetchStatus();
  }, []);

  return (
    <div style={{ background: "#f0f4ff", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
      <h4>📡 Discord Webhook Status: <span>{status}</span></h4>
      {lastAlert && (
        <p>
          <b>Last Alert:</b> {lastAlert.attackType} from {lastAlert.ip}<br />
          <b>Time:</b> {new Date(lastAlert.timestamp).toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default DiscordStatus;
