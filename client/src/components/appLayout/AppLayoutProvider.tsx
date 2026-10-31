"use client";

import { Navbar } from "@/components/layout/Navbar";

export default function AppLayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pb-tabbar">{children}</main>
    </>
  );
}
