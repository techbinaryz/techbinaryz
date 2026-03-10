import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { siteConfig, routeMetadata } from "@/config/site";
import Header from "@/common/Header";
import Footer from "@/common/Footer";
import { ThemeProvider } from "@/components/Providers/ThemeProvider";


const onest = Onest({
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
      <body className={`${onest.className} antialiased`}>
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
