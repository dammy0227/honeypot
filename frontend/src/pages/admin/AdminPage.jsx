import React from "react";
import API from "../../services/api";
import './admin.css'


const AdminPage = () => {
  const handleFakeAction = async (actionType) => {
    try {
      await API.post("/admin-action", { actionType });
      alert(`🧠 '${actionType}' attempted (logged)`);
    } catch (err) {
      console.error("Failed to log admin action");
    }
  };

  return (
    <div className="container">
      <h2>⚙️ Admin Control Panel</h2>
      <p>Welcome back, admin. System status is nominal.</p>

      <section style={{ marginTop: "20px" }}>
        <h4>📦 System Stats</h4>
        <ul>
          <li>Server Uptime: 302 days</li>
          <li>Total Users: 52,421</li>
          <li>Storage Usage: 87%</li>
        </ul>
      </section>

      <section style={{ marginTop: "20px" }}>
        <h4>🧑 User Management</h4>
        <table className="log-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>alice_admin</td><td>Super Admin</td><td>Active</td></tr>
            <tr><td>bob_user</td><td>User</td><td>Suspended</td></tr>
            <tr><td>charlie_mod</td><td>Moderator</td><td>Active</td></tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: "20px" }}>
        <h4>⚠️ Dangerous Actions</h4>
        <button onClick={() => handleFakeAction("DROP_DATABASE")}>🧨 Drop Database</button>
        <button onClick={() => handleFakeAction("VIEW_SECRET_KEYS")} style={{ marginLeft: "10px" }}>
          🔐 View Secret Keys
        </button>
        <button onClick={() => handleFakeAction("REBOOT_SERVER")} style={{ marginLeft: "10px" }}>
          🔁 Reboot Server
        </button>
      </section>
    </div>
  );
};

export default AdminPage;
