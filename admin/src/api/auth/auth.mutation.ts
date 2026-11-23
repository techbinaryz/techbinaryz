import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authKeys, type AuthUser } from './auth.query';
import { authStorage } from '../../lib/auth-storage';

// API Response Type
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// ============================================================================
// Request Types
// ============================================================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface SendOtpRequest {
  email: string;
  password: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface AdminSendOtpRequest {
  email: string;
  password: string;
}

export interface AdminLoginRequest {
  email: string;
  otp: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  password_confirmation: string;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
  password_confirmation: string;
}

export interface UpdateProfileRequest {
  first_name?: string;
  last_name?: string;
  avatar?: string;
}

// ============================================================================
// Response Types
// ============================================================================

export interface LoginResponse {
  success: boolean;
  message: string;
  access_token: string;
  refresh_token: string;
  user: AuthUser;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user: AuthUser;
}

export interface SendOtpResponse {
  success: boolean;
  message: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  access_token: string;
  refresh_token: string;
  user: AuthUser;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

// ============================================================================
// API Helper Functions
// ============================================================================

const authFetch = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(endpoint, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || 'Request failed');
  }

  return data;
};

// ============================================================================
// Auth Mutations
// ============================================================================

/**
 * Send OTP mutation for registration
 * Sends OTP to user's email for registration
 */
export function useSendOtp() {
  return useMutation({
    mutationFn: (data: SendOtpRequest) =>
      authFetch<SendOtpResponse>('/api/auth/send-otp', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  });
}

/**
 * Register mutation
 * Creates a new user account
 */
export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) =>
      authFetch<RegisterResponse>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      // Invalidate auth queries after registration
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
  });
}

/**
 * Login mutation (Step 1 - credentials)
 * Authenticates user with email and password, triggers OTP
 */
export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginRequest) =>
      authFetch<SendOtpResponse>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  });
}

/**
 * Login Verify mutation (Step 2 - OTP)
 * Verifies OTP and completes login
 */
export function useLoginVerify() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: VerifyOtpRequest) =>
      authFetch<VerifyOtpResponse>('/api/auth/login/verify', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: (data) => {
      // Store tokens and user data
      authStorage.setAccessToken(data.access_token);
      authStorage.setRefreshToken(data.refresh_token);
      authStorage.setUser({
        id: data.user._id,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        email: data.user.email,
        role: data.user.role || 'user',
      });
      // Invalidate and refetch auth queries
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
  });
}

/**
 * Admin Send OTP mutation
 * Sends OTP to admin email (configured ADMIN_EMAIL only)
 */
export function useAdminSendOtp() {
  return useMutation({
    mutationFn: (data: AdminSendOtpRequest) =>
      authFetch<SendOtpResponse>('/api/auth/admin/send-otp', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  });
}

/**
 * Admin Login mutation
 * Authenticates admin with email and OTP
 */
export function useAdminLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AdminLoginRequest) =>
      authFetch<VerifyOtpResponse>('/api/auth/admin/login', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: (data) => {
      // Store tokens and user data
      authStorage.setAccessToken(data.access_token);
      authStorage.setRefreshToken(data.refresh_token);
      authStorage.setUser({
        id: data.user._id,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        email: data.user.email,
        role: data.user.role || 'admin',
      });
      // Invalidate and refetch auth queries
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
  });
}

/**
 * Logout mutation
 * Logs out the current user
 */
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      authFetch<LogoutResponse>('/api/auth/logout', {
        method: 'POST',
      }),
    onSuccess: () => {
      // Clear all auth data
      authStorage.clear();
      // Clear all queries
      queryClient.clear();
    },
    onError: () => {
      // Clear auth data even if API call fails
      authStorage.clear();
      queryClient.clear();
    },
  });
}

/**
 * Forgot Password mutation
 * Sends password reset link to user's email
 */
export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) =>
      authFetch<ApiResponse<null>>('/api/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  });
}

/**
 * Reset Password mutation
 * Resets user password using reset token
 */
export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) =>
      authFetch<ApiResponse<null>>('/api/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  });
}

/**
 * Change Password mutation
 * Changes user password (requires authentication)
 */
export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) =>
      authFetch<ApiResponse<null>>('/api/auth/change-password', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  });
}

/**
 * Update Profile mutation
 * Updates user profile information
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) =>
      authFetch<ApiResponse<AuthUser>>('/api/auth/profile', {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      // Invalidate profile and user queries
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
  });
}

/**
 * Refresh Token mutation
 * Refreshes access token using refresh token
 */
export function useRefreshToken() {
  return useMutation({
    mutationFn: () =>
      authFetch<{ access_token: string; refresh_token: string }>(
        '/api/auth/refresh',
        {
          method: 'POST',
          body: JSON.stringify({
            refresh_token: authStorage.getRefreshToken(),
          }),
        }
      ),
    onSuccess: (data) => {
      // Update tokens
      authStorage.setAccessToken(data.access_token);
      authStorage.setRefreshToken(data.refresh_token);
    },
    onError: () => {
      // Clear all auth data on refresh failure
      authStorage.clear();
    },
  });
}
