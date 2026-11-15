import { Navigate } from "@tanstack/react-router";
import { authStorage } from "@/lib/auth-storage";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const isAuthenticated = authStorage.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
