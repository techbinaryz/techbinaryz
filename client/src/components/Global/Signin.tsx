"use client";

import { useState } from "react";
import { Loader2, LogIn } from "lucide-react";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const initialForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export default function SignInForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1500));
    setLoading(false);
    setForm(initialForm);
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

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>

          {/* First + Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-600 text-sm font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className={`w-full bg-white border rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${
                  errors.firstName ? "border-red-400" : "border-gray-300"
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs pl-1">{errors.firstName}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-slate-600 text-sm font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-slate-600 text-sm font-medium">Email address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className={`w-full bg-white border rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${
                errors.email ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs pl-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-slate-600 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full bg-white border rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${
                errors.password ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs pl-1">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-teal-400 hover:bg-teal-500 text-white font-medium transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
            </button>

        </form>
      </div>
    </div>
  );
}
