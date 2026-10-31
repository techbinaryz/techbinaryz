"use client";

import { Navbar } from "@/components/layout/Navbar";

export default function AppLayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-[calc(max(0.75rem,env(safe-area-inset-top))+68px)] lg:pt-[calc(max(1rem,env(safe-area-inset-top))+78px)] pb-tabbar">
        {children}
      </main>
    </>
  );
}
