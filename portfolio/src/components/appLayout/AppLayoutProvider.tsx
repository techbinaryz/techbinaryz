"use client";

import { usePathname } from "next/navigation";
import AppHeader from "@/components/appLayout/appHeader/AppHeader";
import Footer from "@/components/global/Footer";

export default function AppLayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";

  return (
    <>
      <div className={isAuthPage ? "lg:hidden" : ""}>
        <AppHeader />
      </div>
      {!isAuthPage && (
        <main className="pt-16 md:pt-20">
          {children}
        </main>
      )}
      {isAuthPage && children}
      {!isAuthPage && <Footer />}
    </>
  );
}
