"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  sendOtp,
  register,
  login,
  loginVerify,
  logout as logoutApi,
  type SendOtpRequest,
  type RegisterRequest,
  type LoginRequest,
  type LoginVerifyRequest,
} from "@/lib/auth-api";
import { authStorage } from "@/lib/auth-storage";

export const useSendOtp = () => {
  return useMutation({
    mutationFn: (data: SendOtpRequest) => sendOtp(data),
  });
};

export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) => register(data),
    onSuccess: (data) => {
      // Store tokens and user data
      authStorage.setAccessToken(data.access_token);
      authStorage.setRefreshToken(data.refresh_token);
      authStorage.setUser(data.user);

      // Invalidate all queries
      queryClient.invalidateQueries();

      // Navigate to home or dashboard
      router.push("/");
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
  });
};

export const useLoginVerify = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginVerifyRequest) => loginVerify(data),
    onSuccess: (data) => {
      // Store tokens and user data
      authStorage.setAccessToken(data.access_token);
      authStorage.setRefreshToken(data.refresh_token);
      authStorage.setUser(data.user);

      // Invalidate all queries
      queryClient.invalidateQueries();

      // Navigate to home
      router.push("/");
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const refreshToken = authStorage.getRefreshToken();
      if (refreshToken) {
        await logoutApi({ refresh_token: refreshToken });
      }
    },
    onSettled: () => {
      // Clear auth data regardless of API call result
      authStorage.clear();

      // Clear all cached queries
      queryClient.clear();

      // Navigate to login
      router.push("/sign-in");
    },
  });
};

export const useAuth = () => {
  const user = authStorage.getUser();
  const isAuthenticated = authStorage.isAuthenticated();

  return {
    user,
    isAuthenticated,
  };
};
