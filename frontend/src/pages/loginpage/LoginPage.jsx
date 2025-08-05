import React, { useState } from "react";
import API from "../../services/api";
import "./login.css"; 
const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await API.post("/login", formData);
      setStatus("Data captured. Thank you.");
      console.log("🚨 Fake login captured:", res.data);
    } catch (err) {
      console.error("Login trap error:", err);
      setStatus("Something went wrong.");
    }
  };

  return (
    <div className="container">
      <h2 className="title">🔐 Secure Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <p className="status">{status}</p>
    </div>
  );
};

export default LoginPage;
