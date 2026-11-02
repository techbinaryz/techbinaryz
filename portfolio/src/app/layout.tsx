import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SITE } from "@/data/metadata/site.data";
import { ToastProvider } from "@/components/ui/sonner";
import AppLayoutProvider from "@/components/appLayout/AppLayoutProvider";


const geist = Geist({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "TechBinaryz",
    "tech solutions",
    "IT services",
    "software development",
    "IT consulting",
  ],
  authors: [{ name: SITE.creator, url: SITE.url }],
  creator: SITE.creator,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    creator: SITE.social.twitter,
  },
  applicationName: SITE.name,
  appleWebApp: {
    capable: true,
    title: SITE.shortName,
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body className={`${geist.className} bg-white antialiased`}>
        <ToastProvider>
          <AppLayoutProvider>
            {children}
          </AppLayoutProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
