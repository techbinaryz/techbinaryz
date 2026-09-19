import type { Metadata } from "next";
import { siteConfig, routeMetadata } from "@/config/site";
import ContactPage from "@/views/contact-us/Contact.page";

export const metadata: Metadata = {
  title: `${routeMetadata.contact.title} | ${siteConfig.name}`,
  description: routeMetadata.contact.description,
  keywords: ["TechBinaryz", "contact us", "AI support", "get in touch", "tech help"],
  authors: [{ name: siteConfig.creator, url: siteConfig.url }],
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/contact-us`,
    title: `${routeMetadata.contact.title} | ${siteConfig.name}`,
    description: routeMetadata.contact.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${routeMetadata.contact.title} | ${siteConfig.name}`,
    description: routeMetadata.contact.description,
    images: [siteConfig.ogImage],
    creator: `@${siteConfig.creator}`,
  },
  alternates: {
    canonical: `${siteConfig.url}/contact-us`,
  },
};

export default function page() {
  return (
    <div>
      <ContactPage />
    </div>
  );
}
