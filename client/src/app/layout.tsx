import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ProviderWrapper } from "@/components/providers/ProviderWrapper";
import { appConfig } from "@/config/app.config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: appConfig.meta.title,
  description: appConfig.meta.description,
  keywords: [...appConfig.meta.keywords],
  authors: [{ name: appConfig.meta.author }],
  openGraph: {
    title: appConfig.meta.title,
    description: appConfig.meta.description,
    siteName: appConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: appConfig.meta.title,
    description: appConfig.meta.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
