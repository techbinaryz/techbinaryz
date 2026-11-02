import { SITE } from "@/data/metadata/site.data";
import { absoluteUrl } from "@/lib/site";

type JsonLdObject = Record<string, unknown>;

/**
 * Organization schema for homepage and site-wide use
 */
export function organizationJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: SITE.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl(SITE.logo),
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      ...SITE.postalAddress,
    },
    ...(SITE.social
      ? {
          sameAs: [
            SITE.social.twitter,
            SITE.social.linkedin,
            SITE.social.github,
          ].filter(Boolean),
        }
      : {}),
  };
}

/**
 * WebSite schema for enhanced search results
 */
export function websiteJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: absoluteUrl("/"),
    name: SITE.name,
    description: SITE.description,
    publisher: {
      "@id": absoluteUrl("/#organization"),
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: absoluteUrl("/products?search={search_term_string}"),
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Product schema for individual products
 */
export function productJsonLd(product: {
  name: string;
  description: string;
  image?: string;
  price?: number;
  currency?: string;
  slug: string;
}): JsonLdObject {
  const url = absoluteUrl(`/products/${product.slug}`);
  
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    url,
    description: product.description,
    ...(product.image ? { image: absoluteUrl(product.image) } : {}),
    brand: {
      "@type": "Brand",
      name: SITE.name,
    },
    ...(product.price
      ? {
          offers: {
            "@type": "Offer",
            url,
            price: product.price.toFixed(2),
            priceCurrency: product.currency ?? "INR",
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "Organization",
              name: SITE.name,
            },
          },
        }
      : {}),
  };
}

/**
 * ContactPage schema for contact page
 */
export function contactPageJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": absoluteUrl("/contact-us#contactpage"),
    url: absoluteUrl("/contact-us"),
    name: "Contact Us",
    description: "Get in touch with TechBinaryz for inquiries and support",
    mainEntity: {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
    },
  };
}

/**
 * AboutPage schema for about page
 */
export function aboutPageJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": absoluteUrl("/about-us#aboutpage"),
    url: absoluteUrl("/about-us"),
    name: "About Us",
    description: "Learn about TechBinaryz and our mission",
    mainEntity: {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
    },
  };
}

/**
 * CollectionPage schema for products/catalog pages
 */
export function collectionPageJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absoluteUrl("/products#collectionpage"),
    url: absoluteUrl("/products"),
    name: "Products & Facilities",
    description: "Explore our range of innovative products and services",
    mainEntity: {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
    },
  };
}
