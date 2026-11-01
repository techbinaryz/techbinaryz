"use client";

import AppHeader from "@/components/appLayout/appHeader/AppHeader";
import Footer from "@/components/global/Footer";

export default function AppLayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      <main className="pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
}
