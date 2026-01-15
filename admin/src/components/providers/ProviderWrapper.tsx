"use client";

import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { appConfig } from "@/config/app.config";

interface ProviderWrapperProps {
  children: React.ReactNode;
}

export function ProviderWrapper({ children }: ProviderWrapperProps) {
  return (
    <ThemeProvider
      defaultTheme={appConfig.theme.defaultTheme}
      storageKey={appConfig.theme.storageKey}
    >
      <div className="min-h-screen bg-background flex flex-col">
        <div className="w-full 2xl:max-w-7xl mx-auto flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 px-4 sm:px-6 lg:px-8">{children}</main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}
