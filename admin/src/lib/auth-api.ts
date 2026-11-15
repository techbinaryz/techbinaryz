import axios, { AxiosError } from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Create a separate axios instance for auth (no interceptors)
const authApi = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Types
export interface AdminSendOtpRequest {
  email: string;
  password: string;
}

export interface AdminSendOtpResponse {
  success: boolean;
  message: string;
}

export interface AdminLoginRequest {
  email: string;
  otp: string;
}

export interface AdminLoginResponse {
  success: boolean;
  message: string;
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
  };
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  access_token: string;
  refresh_token: string;
}

export interface LogoutRequest {
  refresh_token: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

// API Functions
export const adminSendOtp = async (data: AdminSendOtpRequest): Promise<AdminSendOtpResponse> => {
  const response = await authApi.post<AdminSendOtpResponse>("/auth/admin/send-otp", data);
  return response.data;
};

export const adminLogin = async (data: AdminLoginRequest): Promise<AdminLoginResponse> => {
  const response = await authApi.post<AdminLoginResponse>("/auth/admin/login", data);
  return response.data;
};

export const refreshToken = async (data: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
  const response = await authApi.post<RefreshTokenResponse>("/auth/refresh", data);
  return response.data;
};

export const logout = async (data: LogoutRequest): Promise<LogoutResponse> => {
  const response = await authApi.post<LogoutResponse>("/auth/logout", data);
  return response.data;
};

// Error helper
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ error?: string }>;
    return axiosError.response?.data?.error || axiosError.message || "An error occurred";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unknown error occurred";
};
