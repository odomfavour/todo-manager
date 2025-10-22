import axios from "axios";

const API_BASE = "https://todo-api-h1dl.onrender.com/api";

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: false, // no cookies for token auth
});

// Request interceptor: attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("todo-token"); // store token after login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);
