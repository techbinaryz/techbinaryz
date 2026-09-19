import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { siteConfig, routeMetadata } from "@/config/site";
import Header from "@/components/Global/Header";
import Footer from "@/components/Global/Footer";
import { ThemeProvider } from "@/components/Providers/ThemeProvider";
import { Toaster } from "sonner";


const geist = Geist({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${routeMetadata.home.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["TechBinaryz", "AI starter kit", "AI development", "tech solutions", "machine learning"],
  authors: [{ name: siteConfig.creator, url: siteConfig.url }],
  creator: siteConfig.creator,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: `${siteConfig.name} | ${routeMetadata.home.title}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${routeMetadata.home.title}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: `@${siteConfig.creator}`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${geist.className} antialiased`}>
        <ThemeProvider>
          <Header />
          <main className="pt-16 md:pt-20">
            {children}
          </main>
          <Footer />
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
