import type { Metadata } from "next";
import { siteConfig, routeMetadata } from "@/config/site";
import AboutPage from "@/views/about-us/About.page";

export const metadata: Metadata = {
  title: `${routeMetadata.about.title} | ${siteConfig.name}`,
  description: routeMetadata.about.description,
  keywords: ["TechBinaryz", "about us", "AI company", "AI starter kit", "tech team"],
  authors: [{ name: siteConfig.creator, url: siteConfig.url }],
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/about-us`,
    title: `${routeMetadata.about.title} | ${siteConfig.name}`,
    description: routeMetadata.about.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${routeMetadata.about.title} | ${siteConfig.name}`,
    description: routeMetadata.about.description,
    images: [siteConfig.ogImage],
    creator: `@${siteConfig.creator}`,
  },
  alternates: {
    canonical: `${siteConfig.url}/about-us`,
  },
};

export default function page() {
  return (
    <div className="bg-black text-white">
      <AboutPage />
    </div>
  );
}
