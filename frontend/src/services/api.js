// src/services/api.js

import axios from "axios";

// Base URL comes from .env file (e.g., http://localhost:5000/api)
const API = axios.create({
   baseURL: "https://honeypot-backend-1qkd.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Global error handler (can be improved later)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("🔥 API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default API;
