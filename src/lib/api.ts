import { env } from "@/env";
import axios from "axios";

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_BASE_API_URL,
});

if (typeof window !== "undefined") {
  // Client-side code
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401) {
        localStorage.removeItem("accessToken");
        return Promise.reject(error);
      }
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const { data } = await api.post("/auth/refresh-token");
          localStorage.setItem("accessToken", data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        } catch (err) {
          localStorage.removeItem("accessToken");
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    },
  );
}

export default api;
