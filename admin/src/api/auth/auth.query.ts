import { useQuery } from '@tanstack/react-query';
import { authStorage } from '@/lib/auth-storage';

// Query Keys
export const authKeys = {
  all: ['auth'] as const,
  session: () => [...authKeys.all, 'session'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
} as const;

// API Response Type
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// User Type
export interface AuthUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  role?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Session Type
export interface AuthSession {
  user: AuthUser;
  authenticated: boolean;
  expiresAt?: string;
}

/**
 * Get current authentication session
 * Validates the current user session from the server
 */
export function useAuthSession() {
  return useQuery({
    queryKey: authKeys.session(),
    queryFn: async () => {
      const response = await fetch('/api/auth/session', {
        credentials: 'include', // Include cookies
      });
      if (!response.ok) {
        throw new Error('Failed to fetch session');
      }
      return response.json() as Promise<ApiResponse<AuthSession>>;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
}

/**
 * Get current authenticated user profile
 * Fetches detailed user profile information
 */
export function useAuthProfile() {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: async () => {
      const response = await fetch('/api/auth/profile', {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      return response.json() as Promise<ApiResponse<AuthUser>>;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: false,
  });
}

/**
 * Verify if user is authenticated
 * Lightweight check for authentication status
 */
export function useAuthCheck() {
  return useQuery({
    queryKey: [...authKeys.all, 'check'],
    queryFn: async () => {
      const response = await fetch('/api/auth/check', {
        credentials: 'include',
      });
      if (!response.ok) {
        return { authenticated: false };
      }
      return response.json() as Promise<{ authenticated: boolean }>;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: false,
  });
}

/**
 * Get current authentication state from storage
 * Returns user and authentication status without making API calls
 * Use this for immediate auth checks in components
 */
export function useAuth() {
  const user = typeof window !== 'undefined' ? authStorage.getUser() : null;
  const isAuthenticated = typeof window !== 'undefined' ? authStorage.isAuthenticated() : false;
  const accessToken = typeof window !== 'undefined' ? authStorage.getAccessToken() : null;
  const refreshToken = typeof window !== 'undefined' ? authStorage.getRefreshToken() : null;

  return {
    user,
    isAuthenticated,
    accessToken,
    refreshToken,
    isUser: user?.role === 'user',
    isAdmin: user?.role === 'admin',
  };
}
