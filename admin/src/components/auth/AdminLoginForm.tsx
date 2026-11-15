import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAdminSendOtp, useAdminLogin } from "@/hooks/use-auth";
import { getErrorMessage } from "@/lib/auth-api";
import { toast } from "sonner";

export function AdminLoginForm() {
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const sendOtpMutation = useAdminSendOtp();
  const loginMutation = useAdminLogin();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      await sendOtpMutation.mutateAsync({ email, password });
      setStep("otp");
    } catch (error) {
      console.error("Send OTP error:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits");
      return;
    }

    try {
      await loginMutation.mutateAsync({ email, otp });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleBack = () => {
    setStep("credentials");
    setOtp("");
  };

  if (step === "otp") {
    return (
      <form onSubmit={handleLogin} className="flex flex-col gap-6">
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Enter Verification Code</h1>
            <p className="text-balance text-sm text-muted-foreground">
              We sent a 6-digit code to <strong>{email}</strong>
            </p>
          </div>

          <Field>
            <FieldLabel htmlFor="otp">Verification Code</FieldLabel>
            <Input
              id="otp"
              type="text"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              maxLength={6}
              required
              autoComplete="one-time-code"
              autoFocus
            />
          </Field>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={loginMutation.isPending}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="flex-1"
            >
              {loginMutation.isPending ? "Verifying..." : "Verify & Login"}
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              onClick={() => sendOtpMutation.mutate({ email, password })}
              disabled={sendOtpMutation.isPending}
              className="text-primary underline-offset-4 hover:underline disabled:opacity-50"
            >
              Resend
            </button>
          </div>
        </FieldGroup>
      </form>
    );
  }

  return (
    <form onSubmit={handleSendOtp} className="flex flex-col gap-6">
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your admin credentials to access the dashboard
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="admin@techbinaryz.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            autoFocus
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </Field>

        <Field>
          <Button
            type="submit"
            disabled={sendOtpMutation.isPending}
            className="w-full"
          >
            {sendOtpMutation.isPending ? "Sending OTP..." : "Continue"}
          </Button>
        </Field>

        <p className="text-center text-xs text-muted-foreground">
          Secure admin access with two-factor authentication
        </p>
      </FieldGroup>
    </form>
  );
}
