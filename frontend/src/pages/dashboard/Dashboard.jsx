import React, { useEffect, useState } from "react";
import API from "../../services/api";
import LogTable from "../../components/logtable/LogTable";
import Charts from "../../components/chart/Charts";
import DiscordStatus from "../../components/discordstatus/DiscordStatus";
import UploadPage from "../upload/UploadPage";
import LoginPage from "../loginpage/LoginPage";
import ChatPage from "../chatpage/ChatPage";
import AdminPage from "../admin/AdminPage";
import "./dashboard.css";

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("discord"); // default view

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await API.get("/logs");
        setLogs(res.data);
      } catch (err) {
        console.error("Failed to fetch logs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const renderContent = () => {
    if (loading) return <p>Loading...</p>;

    switch (activeTab) {
      case "discord":
        return <DiscordStatus />;
      case "charts":
        return <Charts data={logs} />;
      case "logs":
        return <LogTable data={logs} />;
      case "login":
        return <LoginPage />;
      case "upload":
        return <UploadPage />;
      case "chat":
        return <ChatPage />;
      case "admin":
        return <AdminPage />;
      default:
        return <p>Select an item from the sidebar</p>;
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2 className="logo">🛡️ Honeypot</h2>
        <nav>
          <ul>
            <li className={activeTab === "discord" ? "active" : ""} onClick={() => setActiveTab("discord")}>
              📡 Discord Status
            </li>
            <li className={activeTab === "charts" ? "active" : ""} onClick={() => setActiveTab("charts")}>
              📊 Attack Charts
            </li>
            <li className={activeTab === "logs" ? "active" : ""} onClick={() => setActiveTab("logs")}>
              📄 Logs Table
            </li>
            <li className={activeTab === "login" ? "active" : ""} onClick={() => setActiveTab("login")}>
              🔐 Fake Login
            </li>
            <li className={activeTab === "upload" ? "active" : ""} onClick={() => setActiveTab("upload")}>
              📤 File Upload
            </li>
            <li className={activeTab === "chat" ? "active" : ""} onClick={() => setActiveTab("chat")}>
              💬 Chat Trap
            </li>
            <li className={activeTab === "admin" ? "active" : ""} onClick={() => setActiveTab("admin")}>
              ⚙️ Admin Actions
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <h3 className="section-title">
          {activeTab === "discord" && "📡 Discord Webhook Status"}
          {activeTab === "charts" && "📊 Attack Analytics"}
          {activeTab === "logs" && "📄 Attack Logs Table"}
          {activeTab === "login" && "🔐 Fake Login Form"}
          {activeTab === "upload" && "📤 File Upload Trap"}
          {activeTab === "chat" && "💬 Chatbox Injection Test"}
          {activeTab === "admin" && "⚙️ Admin Button Trap"}
        </h3>
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
