"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, PhoneCall, Send } from "lucide-react";
import Link from "next/link";
import { contactPageData } from "@/data/Content-Change/Contact-Us.data";
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
  message: z.string().min(1, "Message is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const { fields } = contactPageData.form;

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
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1500));
    console.log(data);
    toast("Message sent successfully!");
    setLoading(false);
    reset();
  };

  return (
    <div className="flex flex-col items-center py-10 justify-center bg-primary px-4 gap-6">

      {/* Form card */}
      <div className="w-full max-w-2xl bg-white backdrop-blur-md border border-white/10 rounded-3xl p-10 shadow-2xl">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-700 flex flex-col sm:flex-row items-center justify-center gap-2">
            <PhoneCall className="w-7 h-7" />
            {contactPageData.heading}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {contactPageData.subheading}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

          {/* First + Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-slate-600 text-sm font-medium">
                {fields.firstName.label}
              </Label>
              <Input
                type="text"
                placeholder={fields.firstName.placeholder}
                className={errors.firstName ? "border-red-400" : ""}
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs pl-1">{errors.firstName.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-slate-600 text-sm font-medium">
                {fields.lastName.label}
              </Label>
              <Input
                type="text"
                placeholder={fields.lastName.placeholder}
                {...register("lastName")}
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-slate-600 text-sm font-medium">
              {fields.email.label}
            </Label>
            <Input
              type="email"
              placeholder={fields.email.placeholder}
              className={errors.email ? "border-red-400" : ""}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs pl-1">{errors.email.message}</p>
            )}
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-slate-600 text-sm font-medium">
              {fields.message.label}
            </Label>
            <textarea
              placeholder={fields.message.placeholder}
              rows={5}
              className={`w-full bg-white border rounded-2xl px-4 py-3 text-slate-700 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none transition ${
                errors.message ? "border-red-400" : "border-gray-300"
              }`}
              {...register("message")}
            />
            {errors.message && (
              <p className="text-red-500 text-xs pl-1">{errors.message.message}</p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-teal-400 hover:bg-teal-500 text-white font-medium transition cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {contactPageData.form.loadingLabel}
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                {contactPageData.form.submitLabel}
              </>
            )}
          </Button>

        </form>

        {/* Data usage note */}
        <p className="mt-6 text-xs text-slate-400 text-center leading-relaxed">
          {contactPageData.dataNote}
        </p>

        {/* Legal links */}
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {contactPageData.legalLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs text-teal-500 hover:text-teal-400 transition underline underline-offset-2"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
