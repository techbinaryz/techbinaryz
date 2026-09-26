import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import HomePage from "@/views/home/Home.page";

export const metadata: Metadata = {
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function page() {
  return (
    <div>
      <HomePage />
    </div>
  );
}
