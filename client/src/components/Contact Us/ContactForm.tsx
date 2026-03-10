"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="flex items-center py-10 justify-center bg-primary px-4">
      <div className="w-full max-w-2xl bg-secondary backdrop-blur-md border border-white/10 rounded-3xl p-10 shadow-2xl">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Need any Help? Get in touch 👋
          </h1>
          <p className="text-gray-300 mt-2 text-sm">
            Open a ticket, we will get back to you
            ASAP
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* First + Last Name */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Jhamse"
                className="mt-2 w-full bg-transparent border border-white/10 rounded-full px-4 py-3 text-base-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#725cff]"
              />
            </div>

            <div>
              <label className="text-white text-sm">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="mt-2 w-full bg-transparent border border-white/10 rounded-full px-4 py-3 text-base-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#725cff]"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-white text-sm">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="mt-2 w-full bg-transparent border border-white/10 rounded-full px-4 py-3 text-base-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#725cff]"
            />
          </div>

          {/* Message */}
          <div>
            <label className="text-white text-sm">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              placeholder="Type your message"
              className="mt-2 w-full bg-transparent border border-white/10 rounded-2xl px-4 py-3 text-base-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#725cff]"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="cursor-pointer w-full py-3 rounded-full bg-linear-to-b bg-tertiary hover:bg-[#c0fdfb] hover:text-primary text-white font-medium hover:opacity-90 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
