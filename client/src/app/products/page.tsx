import type { Metadata } from "next";
import { siteConfig, routeMetadata } from "@/config/site";
import ProductsPage from "@/views/products/Products.page";

export const metadata: Metadata = {
  title: `${routeMetadata.products.title} | ${siteConfig.name}`,
  description: routeMetadata.products.description,
  keywords: ["TechBinaryz", "AI products", "AI tools", "subscription plans", "precision AI", "facilities"],
  authors: [{ name: siteConfig.creator, url: siteConfig.url }],
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/products`,
    title: `${routeMetadata.products.title} | ${siteConfig.name}`,
    description: routeMetadata.products.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${routeMetadata.products.title} | ${siteConfig.name}`,
    description: routeMetadata.products.description,
    images: [siteConfig.ogImage],
    creator: `@${siteConfig.creator}`,
  },
  alternates: {
    canonical: `${siteConfig.url}/products`,
  },
};

export default function page() {
  return (
    <div>
      <ProductsPage />
    </div>
  );
}
