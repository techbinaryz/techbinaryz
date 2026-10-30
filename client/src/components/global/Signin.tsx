"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <div className="flex items-center py-10 justify-center bg-primary px-4">
      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-3xl p-10 shadow-lg">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-700 flex flex-col sm:flex-row items-center justify-center gap-2">
            <LogIn className="w-7 h-7" /> Sign In
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Welcome back! Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

          {/* First + Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-slate-600 text-sm font-medium">First Name</Label>
              <Input
                type="text"
                placeholder="Enter your first name"
                className={errors.firstName ? "border-red-400" : ""}
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs pl-1">{errors.firstName.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-slate-600 text-sm font-medium">Last Name</Label>
              <Input
                type="text"
                placeholder="Enter your last name"
                {...register("lastName")}
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-slate-600 text-sm font-medium">Email address</Label>
            <Input
              type="email"
              placeholder="example@gmail.com"
              className={errors.email ? "border-red-400" : ""}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs pl-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-slate-600 text-sm font-medium">Password</Label>
            <Input
              type="password"
              placeholder="Enter your password"
              className={errors.password ? "border-red-400" : ""}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs pl-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={loading}
              className=" min-w-50 py-3 px-8 rounded-full bg-teal-400 hover:bg-teal-500 text-white font-medium transition cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}
