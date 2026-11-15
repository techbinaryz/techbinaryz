import axios, { AxiosError } from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Create axios instance for auth
const authApi = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Types
export interface SendOtpRequest {
  email: string;
}

export interface SendOtpResponse {
  success: boolean;
  message: string;
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  phone: string;
  gender: "Male" | "Female" | "Other";
  occupation: "Student" | "Teacher" | "Engineer" | "Doctor" | "Lawyer" | "Artist" | "Other";
  password: string;
  otp: string;
}

export interface RegisterResponse {
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

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  requires_otp: boolean;
}

export interface LoginVerifyRequest {
  email: string;
  otp: string;
}

export interface LoginVerifyResponse {
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
export const sendOtp = async (data: SendOtpRequest): Promise<SendOtpResponse> => {
  const response = await authApi.post<SendOtpResponse>("/auth/send-otp", data);
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await authApi.post<RegisterResponse>("/auth/register", data);
  return response.data;
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await authApi.post<LoginResponse>("/auth/login", data);
  return response.data;
};

export const loginVerify = async (data: LoginVerifyRequest): Promise<LoginVerifyResponse> => {
  const response = await authApi.post<LoginVerifyResponse>("/auth/login/verify", data);
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
