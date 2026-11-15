"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, LogIn, Eye, EyeOff, ChevronLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/sonner";
import { useLogin, useLoginVerify } from "@/hooks/use-auth";
import { getErrorMessage } from "@/lib/auth-api";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const loginMutation = useLogin();
  const verifyMutation = useLoginVerify();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitCredentials = async (data: LoginData) => {
    loginMutation.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          setEmail(data.email);
          setStep("otp");
          toast("OTP sent to your email! Please check your inbox.", "success");
        },
        onError: (error) => {
          toast(`Login failed: ${getErrorMessage(error)}`, "error");
        },
      }
    );
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);

    const lastIndex = Math.min(pastedData.length, 5);
    otpInputRefs.current[lastIndex]?.focus();
  };

  const handleVerifyOtp = () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      toast("Please enter all 6 digits", "error");
      return;
    }

    verifyMutation.mutate(
      {
        email,
        otp: otpCode,
      },
      {
        onSuccess: () => {
          toast("Signed in successfully! Redirecting...", "success");
        },
        onError: (error) => {
          toast(`Verification failed: ${getErrorMessage(error)}`, "error");
          setOtp(["", "", "", "", "", ""]);
          otpInputRefs.current[0]?.focus();
        },
      }
    );
  };

  const handleBackToCredentials = () => {
    setStep("credentials");
    setOtp(["", "", "", "", "", ""]);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-2 md:p-4">
      <div className="flex w-full max-w-[95vw] max-h-[95vh] overflow-hidden rounded-2xl">
        {/* Left Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center overflow-hidden relative">
          <Image
            src="/Signin.jpg"
            alt="Welcome back"
            width={600}
            height={800}
            className="w-full h-full object-cover rounded-2xl"
            priority
          />
          <div className="absolute top-4 left-4">
            <div className="backdrop-blur-md rounded-xl p-2 flex items-center gap-4">
              <Image
                src="/TechBinary.png"
                alt="TechBinaryZ Logo"
                width={150}
                height={120}
              />
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <Button variant="secondary" onClick={() => router.back()}>
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center p-3 md:p-8 lg:p-16 relative">
          <ScrollArea className="h-full w-full">
            <div className="w-full max-w-lg mx-auto pt-8 md:pt-16 pb-8">
              {step === "credentials" ? (
                <>
                  <div className="mb-4 px-4 md:px-12">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h2>
                    <p className="text-slate-600 text-sm">Enter your credentials to sign in</p>
                  </div>

                  <form
                    onSubmit={handleSubmit(onSubmitCredentials)}
                    className="space-y-5 px-4 md:px-12 py-6 md:py-10 rounded-2xl"
                    noValidate
                  >
                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-slate-700 text-sm font-medium">Email</Label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        className={errors.email ? "border-red-400" : ""}
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs pl-1">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-slate-700 text-sm font-medium">Password</Label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className={errors.password ? "border-red-400 pr-10" : "pr-10"}
                          {...register("password")}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-xs pl-1">{errors.password.message}</p>
                      )}
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={loginMutation.isPending}
                      className="w-full py-3 rounded-full bg-teal-400 hover:bg-teal-500 text-white font-medium transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      {loginMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <LogIn className="w-4 h-4" />
                          Continue
                        </>
                      )}
                    </Button>

                    {/* Sign Up Link */}
                    <div className="text-center text-sm text-slate-600">
                      Don't have an account?{" "}
                      <Link href="/sign-up" className="text-teal-600 hover:text-teal-700 font-medium underline">
                        Sign Up
                      </Link>
                    </div>
                  </form>
                </>
              ) : (
                // OTP Verification Step
                <>
                  <div className="mb-6 px-4 md:px-12">
                    <button
                      onClick={handleBackToCredentials}
                      className="mb-4 flex items-center gap-2 text-slate-600 hover:text-slate-800 transition"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </button>
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Verify OTP</h2>
                    <p className="text-slate-600 text-sm flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Check your email for the 6-digit code
                    </p>
                    <p className="text-slate-500 text-xs mt-1">{email}</p>
                  </div>

                  <div className="space-y-6 px-4 md:px-12 py-6 md:py-10">
                    {/* OTP Input */}
                    <div className="flex flex-col gap-3">
                      <Label className="text-slate-700 text-sm font-medium text-center">
                        Enter OTP
                      </Label>
                      <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
                        {otp.map((digit, index) => (
                          <Input
                            key={index}
                            ref={(el) => {
                              otpInputRefs.current[index] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            className="w-12 h-12 text-center text-lg font-semibold"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Verify Button */}
                    <Button
                      onClick={handleVerifyOtp}
                      disabled={verifyMutation.isPending || otp.some((d) => !d)}
                      className="w-full py-3 rounded-full bg-teal-400 hover:bg-teal-500 text-white font-medium transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      {verifyMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <LogIn className="w-4 h-4" />
                          Verify & Sign In
                        </>
                      )}
                    </Button>

                    {/* Resend OTP */}
                    <div className="text-center">
                      <button
                        onClick={() => handleSubmit(onSubmitCredentials)()}
                        disabled={loginMutation.isPending}
                        className="text-sm text-teal-600 hover:text-teal-700 underline"
                      >
                        Resend OTP
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
