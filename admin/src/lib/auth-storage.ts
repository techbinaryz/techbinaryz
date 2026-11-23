/**
 * Auth storage utilities for managing tokens and user data
 */

export interface StoredUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

const KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER: "user",
} as const;

export const authStorage = {
  // Tokens
  getAccessToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(KEYS.ACCESS_TOKEN);
  },

  setAccessToken: (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEYS.ACCESS_TOKEN, token);
    // Set marker cookie for SSR/middleware checks
    document.cookie = `${KEYS.ACCESS_TOKEN}=1; path=/; SameSite=Lax`;
  },

  getRefreshToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(KEYS.REFRESH_TOKEN);
  },

  setRefreshToken: (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEYS.REFRESH_TOKEN, token);
  },

  // User data
  getUser: (): StoredUser | null => {
    if (typeof window === "undefined") return null;
    const user = localStorage.getItem(KEYS.USER);
    if (!user) return null;
    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  },

  setUser: (user: StoredUser): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
  },

  // Clear all auth data
  clear: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(KEYS.ACCESS_TOKEN);
    localStorage.removeItem(KEYS.REFRESH_TOKEN);
    localStorage.removeItem(KEYS.USER);
    document.cookie = `${KEYS.ACCESS_TOKEN}=; path=/; max-age=0; SameSite=Lax`;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false;
    return !!authStorage.getAccessToken() && !!authStorage.getRefreshToken();
  },
};
