import type { Metadata } from "next";
import { siteConfig, routeMetadata } from "@/config/site";
import Signin from "@/components/Global/Signin";

export const metadata: Metadata = {
  title: `${routeMetadata.signIn.title} | ${siteConfig.name}`,
  description: routeMetadata.signIn.description,
  keywords: ["TechBinaryz", "sign in", "login", "account access"],
  authors: [{ name: siteConfig.creator, url: siteConfig.url }],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/sign-in`,
    title: `${routeMetadata.signIn.title} | ${siteConfig.name}`,
    description: routeMetadata.signIn.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${routeMetadata.signIn.title} | ${siteConfig.name}`,
    description: routeMetadata.signIn.description,
    images: [siteConfig.ogImage],
    creator: `@${siteConfig.creator}`,
  },
  alternates: {
    canonical: `${siteConfig.url}/sign-in`,
  },
};

export default function page() {
  return (
    <div>
      <Signin />
    </div>
  );
}
