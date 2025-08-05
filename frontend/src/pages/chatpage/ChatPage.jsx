import React, { useState } from "react";
import API from "../../services/api";
import "./chat.css";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [responses, setResponses] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await API.post("/chat", { message });
      setResponses((prev) => [...prev, { you: message, bot: "Thanks for your message." }]);
      setMessage("");
      setStatus("Captured.");
      console.log("📥 XSS trap message:", res.data);
    } catch (err) {
      console.error("Error sending chat input:", err);
      setStatus("Failed to send.");
    }
  };

  return (
    <div className="container">
      <h2 className="title">💬 Support Chat</h2>

      <div className="chat-box">
        {responses.map((r, i) => (
          <div key={i} className="chat-line">
            <b>You:</b> {r.you}
            <br />
            <b>Bot:</b> {r.bot}
          </div>
        ))}
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>

      <p className="status">{status}</p>
    </div>
  );
};

export default ChatPage;
