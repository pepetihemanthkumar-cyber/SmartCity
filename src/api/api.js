import axios from "axios";

// 🔥 BACKEND URL (LIVE)
const BASE_URL = "https://smartcity-backend-dxy4.onrender.com/api";

// 🔥 Create axios instance
const API = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

/* ================= REQUEST INTERCEPTOR ================= */
// ✅ Attach JWT token automatically
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

/* ================= RESPONSE INTERCEPTOR ================= */
// 🔥 Handle errors globally
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response) {

      // 🔐 Token expired or invalid
      if (error.response.status === 401) {
        console.warn("Unauthorized → Logging out");

        localStorage.removeItem("token");

        // 🔥 redirect to login page
        window.location.href = "/login";
      }

      // ❌ Server error
      if (error.response.status === 500) {
        console.error("Server Error");
      }
    }

    return Promise.reject(error);
  }
);

export default API;