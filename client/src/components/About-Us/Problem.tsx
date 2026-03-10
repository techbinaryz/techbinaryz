"use client";

import { useState } from "react";
import Image from "next/image";
import SwitchCheck from "./General/SwitchCheck";

export default function Problem() {
  const [isDark, setIsDark] = useState(true);

  return (
    <section className="py-32 px-6 w-full md:px-20 border-t bg-primary-brand">
      <div className="2xl:max-w-7xl mx-auto flex gap-5 justify-between">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-semibold">
            The Problem
          </h2>

          <p className="mt-6 text-base-random text-lg max-w-lg leading-relaxed">
            Building an AI SaaS is 10% model logic
            and 90% repetitive setup. Auth. Billing.
            Database schemas. Rate limits. UI
            states. Deployment edge cases.
          </p>

          <p className="mt-6 text-base-random text-lg max-w-lg leading-relaxed">
            We rebuilt the same infrastructure too
            many times. So we stopped rebuilding it.
          </p>

          <h3 className="mt-12 text-2xl font-semibold">
            The Mission
          </h3>

          <p className="mt-6 text-base-random text-lg max-w-lg leading-relaxed">
            Provide a production-grade AI foundation
            so developers can focus on their unique
            intelligence — not boilerplate.
          </p>
        </div>

        {/* Visible to Only Large Screen  */}
        <div className="hidden lg:flex flex-col items-end w-full gap-5">
          <SwitchCheck
            isDark={isDark}
            setIsDark={setIsDark}
          />

          <div
            className={`relative mx-auto max-w-5xl rounded-3xl p-4 backdrop-blur-xl transition-all duration-300
          ${isDark
                ? "border border-white/10 bg-white/5 shadow-2xl"
                : "border border-gray-300 bg-white/50 shadow-lg"
              }`}
          >
            <Image
              src={
                isDark
                  ? "/HomeImg/ft1.webp"
                  : "/HomeImg/tab-image-2-dark.webp"
              }
              alt="AI Dashboard Preview"
              width={1200}
              height={700}
              className="rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
