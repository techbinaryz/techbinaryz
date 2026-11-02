// Site-wide constants following grannth pattern
export const SITE = {
  name: "TechBinaryz",
  shortName: "TechBinaryz",
  /** Shown with the name: in page titles, the header lockup and the footer. */
  tagline: "Empowering Tech Solutions",
  description:
    "Empowering businesses with cutting-edge IT solutions and innovative technology services.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://techbinaryz.com",
  email: "hello@techbinaryz.com",
  phone: "+91 00000 00000",
  address: "India",
  /** Structured address for JSON-LD. */
  postalAddress: {
    addressLocality: "India",
    addressRegion: "India",
    addressCountry: "IN",
  },
  logo: "/Tech_Binaryz_Logo_Modify_7-01.png",
  ogImage: "/TechBinary.png",
  creator: "TechBinaryz",
  social: {
    twitter: "@techbinaryz",
    linkedin: "https://www.linkedin.com/company/techbinaryz",
    github: "https://github.com/techbinaryz",
  },
} as const;
