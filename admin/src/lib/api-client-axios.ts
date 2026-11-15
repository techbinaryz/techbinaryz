import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { authStorage } from "./auth-storage";
import { refreshToken as refreshTokenApi } from "./auth-api";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Create axios instance with auth
export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Shared refresh promise to prevent concurrent refresh requests
let refreshPromise: Promise<string> | null = null;

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = authStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle 401 and refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // If 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        // Use shared refresh promise if one is already in flight
        if (!refreshPromise) {
          refreshPromise = (async () => {
            const refresh_token = authStorage.getRefreshToken();
            if (!refresh_token) {
              throw new Error("No refresh token");
            }

            const data = await refreshTokenApi({ refresh_token });
            
            // Store new tokens
            authStorage.setAccessToken(data.access_token);
            authStorage.setRefreshToken(data.refresh_token);

            return data.access_token;
          })();
        }

        const newToken = await refreshPromise;
        refreshPromise = null;

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed - clear auth and redirect to login
        refreshPromise = null;
        authStorage.clear();
        
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
