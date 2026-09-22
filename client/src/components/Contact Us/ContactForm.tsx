"use client";

import { useState } from "react";
import { Loader2, PhoneCall, Send } from "lucide-react";
import Link from "next/link";
import { contactPageData } from "@/data/Content-Change/Contact-Us.data";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

const initialForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const { fields } = contactPageData.form;

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.firstName.trim())
      newErrors.firstName = fields.firstName.errorMessage;
    if (!form.email.trim())
      newErrors.email = fields.email.errorMessage;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = fields.email.errorInvalidMessage;
    if (!form.message.trim())
      newErrors.message = fields.message.errorMessage;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>

          {/* First + Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-600 text-sm font-medium">
                {fields.firstName.label}
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder={fields.firstName.placeholder}
                className={`w-full bg-white border rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${
                  errors.firstName ? "border-red-400" : "border-gray-300"
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs pl-1">{errors.firstName}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-slate-600 text-sm font-medium">
                {fields.lastName.label}
              </label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder={fields.lastName.placeholder}
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-slate-600 text-sm font-medium">
              {fields.email.label}
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder={fields.email.placeholder}
              className={`w-full bg-white border rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${
                errors.email ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs pl-1">{errors.email}</p>
            )}
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label className="text-slate-600 text-sm font-medium">
              {fields.message.label}
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              placeholder={fields.message.placeholder}
              className={`w-full bg-white border rounded-2xl px-4 py-3 text-slate-700 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none transition ${
                errors.message ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.message && (
              <p className="text-red-500 text-xs pl-1">{errors.message}</p>
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
                {contactPageData.form.loadingLabel}
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                {contactPageData.form.submitLabel}
              </>
            )}
          </button>

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
