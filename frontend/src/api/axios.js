import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 REQUEST INTERCEPTOR (TOKEN AUTO ATTACH)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ⚠️ RESPONSE INTERCEPTOR (GLOBAL ERROR HANDLE)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 🧠 SAFE CHECK (avoid crash)
    if (!error.response) {
      console.log("Network Error:", error.message);
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      localStorage.removeItem("token");

      // safer redirect (Vite/React Router friendly)
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;