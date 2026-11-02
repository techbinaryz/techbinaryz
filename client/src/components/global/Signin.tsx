"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { Loader2, LogIn, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/sonner";


const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1500));
    console.log(data);
    toast("Signed in successfully!");
    setLoading(false);
    reset();
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-2 md:p-4">
      <div className="flex w-full max-w-[95vw] max-h-[95vh] overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Left Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center overflow-hidden">
          <Image
            src="/Signin.jpg"
            alt="Welcome back"
            width={600}
            height={800}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        
        {/* Right Side - Form */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-16">
          
          <ScrollArea className="h-full w-full">
            <div className="w-full max-w-lg mx-auto pt-16">
              {/* Back Button */}
              
              {/* Heading */}
              <div className="mb-4 px-12">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h2>
                <p className="text-slate-600 text-sm">Enter your credentials to access your account</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-12 py-10 rounded-2xl" noValidate>
              {/* First + Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-slate-700 text-sm font-medium">First Name</Label>
                  <Input
                    type="text"
                    placeholder="John"
                    className={errors.firstName ? "border-red-400" : ""}
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs pl-1">{errors.firstName.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label className="text-slate-700 text-sm font-medium">Last Name</Label>
                  <Input
                    type="text"
                    placeholder="Doe"
                    {...register("lastName")}
                  />
                </div>
              </div>

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
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs pl-1">{errors.password.message}</p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full py-6 bg-tertiary hover:bg-[#c0fdfb] hover:text-primary-brand text-white font-medium transition"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>
          </div>
        </ScrollArea>
        </div>
      </div>
    </div>
  );
}
