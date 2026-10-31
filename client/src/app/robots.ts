import { MetadataRoute } from "next";
import { SITE } from "@/data/metadata/site.data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/sign-in",
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
