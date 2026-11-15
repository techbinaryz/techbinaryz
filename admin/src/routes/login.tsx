import { createFileRoute, redirect } from "@tanstack/react-router";
import { AdminLoginForm } from "@/components/auth/AdminLoginForm";
import { authStorage } from "@/lib/auth-storage";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  beforeLoad: () => {
    // Redirect to dashboard if already authenticated
    if (typeof window !== "undefined" && authStorage.isAuthenticated()) {
      throw redirect({ to: "/" });
    }
  },
});

function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-background to-muted/20 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-lg border bg-card p-8 shadow-lg">
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
              <span className="text-lg font-bold text-primary-foreground">TB</span>
            </div>
            <h2 className="text-sm font-semibold text-muted-foreground">
              TechBinaryz
            </h2>
          </div>
          <AdminLoginForm />
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} TechBinaryz. All rights reserved.
        </p>
      </div>
    </div>
  );
}
