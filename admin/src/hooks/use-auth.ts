import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  adminSendOtp,
  adminLogin,
  logout as logoutApi,
  type AdminSendOtpRequest,
  type AdminLoginRequest,
} from "@/lib/auth-api";
import { authStorage } from "@/lib/auth-storage";
import { toast } from "sonner";

export const useAdminSendOtp = () => {
  return useMutation({
    mutationFn: (data: AdminSendOtpRequest) => adminSendOtp(data),
    onSuccess: (data) => {
      toast.success(data.message || "OTP sent to your email");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to send OTP");
    },
  });
};

export const useAdminLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AdminLoginRequest) => adminLogin(data),
    onSuccess: (data) => {
      // Store tokens and user data
      authStorage.setAccessToken(data.access_token);
      authStorage.setRefreshToken(data.refresh_token);
      authStorage.setUser(data.user);

      // Invalidate all queries to refetch with new auth
      queryClient.invalidateQueries();

      toast.success(data.message || "Login successful");

      // Navigate to dashboard
      navigate({ to: "/" });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Login failed");
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
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

      toast.success("Logged out successfully");

      // Navigate to login
      navigate({ to: "/login" });
    },
    onError: (error: Error) => {
      // Still clear auth even if API call fails
      authStorage.clear();
      queryClient.clear();
      toast.error(error.message || "Logout failed");
      navigate({ to: "/login" });
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
