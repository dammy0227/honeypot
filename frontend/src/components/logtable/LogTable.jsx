import React from "react";
import "./logtable.css";
const LogTable = ({ data }) => {
  return (
    <div>
      <h3 style={{ marginTop: "30px" }}>📋 Attack Logs</h3>
      <div style={{ overflowX: "auto" }}>
        <table className="log-table">
          <thead>
            <tr>
              <th>#</th>
              <th>IP Address</th>
              <th>Route</th>
              <th>Payload</th>
              <th>Attack Type</th>
              <th>User Agent</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>No logs yet</td>
              </tr>
            ) : (
              data.map((log, index) => (
                <tr key={log._id || index}>
                  <td>{index + 1}</td>
                  <td>{log.ipAddress}</td>
                  <td>{log.routeAccessed}</td>
                  <td>
                    <pre style={{ whiteSpace: "pre-wrap" }}>
                      {JSON.stringify(log.payload, null, 1)}
                    </pre>
                  </td>
                  <td>{log.attackType || "N/A"}</td>
                  <td>{log.userAgent || "N/A"}</td>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogTable;
