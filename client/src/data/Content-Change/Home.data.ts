import {
  Code2,
  Globe,
  Layers,
  Rocket,
  Settings2,
  ShieldCheck,
  Smartphone,
  Wrench,
  Zap,
} from "lucide-react";

// ─── Transform (Hero) ────────────────────────────────────────────────────────
export const transformData = {
  badge: "End-to-End Technology Solutions",
  heading: "We Build the Technology Your Business Runs On",
  subheading:
    "From custom software and web platforms to mobile apps and our own flagship product — TechBinaryz turns your vision into production-ready solutions.",
  primaryAction: { label: "Explore Our Products", href: "/products" },
  secondaryAction: { label: "Watch Overview" },
  trustedLabel: "Trusted by businesses across industries including...",
};

// ─── Core Features ────────────────────────────────────────────────────────────
export const coreFeaturesData = {
  heading: "What We Build",
  subheading:
    "We design, develop, and deliver technology that solves real business problems — built to scale, built to last.",
  features: [
    {
      icon: Globe,
      title: "Web Application Development",
      description:
        "Full-stack web platforms tailored to your workflows — from internal tools to customer-facing SaaS products.",
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description:
        "Cross-platform and native mobile applications that deliver seamless experiences on iOS and Android.",
    },
    {
      icon: Code2,
      title: "Custom Software Solutions",
      description:
        "Bespoke software engineered around your exact business requirements — not off-the-shelf compromises.",
    },
    {
      icon: Layers,
      title: "Our Flagship Product",
      description:
        "TechBinaryz's own platform — a ready-to-deploy solution built with the same standards we apply to every client project.",
    },
    {
      icon: ShieldCheck,
      title: "Maintenance & Support",
      description:
        "Ongoing technical support, security patches, and performance optimisations to keep your systems running smoothly.",
    },
    {
      icon: Settings2,
      title: "IT Consulting",
      description:
        "Strategic guidance on architecture, tech stack selection, and digital transformation for businesses at any stage.",
    },
  ],
};

// ─── Key Benefits ─────────────────────────────────────────────────────────────
export const keyData = {
  heading: "Why Teams Choose TechBinaryz",
  subheading:
    "We don't just write code. We own the outcome — from the first requirement to the final deployment.",
  cards: [
    {
      title: "Production-Ready from Day One",
      description:
        "Every solution we deliver is built for real-world load, security, and maintainability — not just demos.",
      image: "/HomeImg/bn-1.svg",
      alt: "Production ready",
      cta: null,
    },
    {
      title: "Full-Cycle Delivery",
      description:
        "Design, development, QA, deployment, and support — one team, one responsibility, no handoff chaos.",
      image: "/HomeImg/bn-2.svg",
      alt: "Full cycle",
      cta: null,
    },
    {
      title: "Start Your Project Today",
      description:
        "Tell us what you need. We'll scope it, estimate it, and get moving — no lengthy procurement process.",
      image: "/HomeImg/bn-3.svg",
      alt: "Start project",
      cta: "Get in Touch",
      ctaHref: "/contact-us",
    },
  ],
};

// ─── Tools / Services Showcase ────────────────────────────────────────────────
export const servicesData = {
  heading: "The Full Stack of Our Services",
  subheading:
    "Whether you need a standalone module or an end-to-end platform, we have the capability to deliver it.",
  badges: [
    { icon: Globe, label: "Web Platforms" },
    { icon: Smartphone, label: "Mobile Apps" },
    { icon: Code2, label: "Custom Software" },
    { icon: Layers, label: "Our Product" },
    { icon: Wrench, label: "Maintenance" },
  ],
  bottomHeading: "The fastest way to ship your next product",
  bottomSubheading:
    "We handle architecture, development, and delivery so your team can stay focused on the business.",
  cta: "Start a Project",
  ctaHref: "/contact-us",
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const faqData = {
  heading: "Frequently Asked Questions",
  subheading: "Answered all frequently asked questions, Still confused?",
  subheadingCta: "Feel free to contact us",
  questions: [
    {
      id: "item-1",
      question: "What kind of projects does TechBinaryz take on?",
      answer:
        "We work on web applications, mobile apps, custom software, and platform development. Whether it's a greenfield build or an existing system that needs improvement, we scope it based on your requirements.",
    },
    {
      id: "item-2",
      question: "Do you also have your own product?",
      answer:
        "Yes. Alongside client work, TechBinaryz develops and maintains its own flagship product — built with the same engineering standards we apply to every project we deliver.",
    },
    {
      id: "item-3",
      question: "How does the engagement process work?",
      answer:
        "We start with a discovery call to understand your requirements. From there we produce a scoped proposal with timelines and deliverables. Once agreed, development begins in structured phases with regular check-ins.",
    },
    {
      id: "item-4",
      question: "Do you provide support after the project is delivered?",
      answer:
        "Yes. We offer ongoing maintenance, support, and enhancement plans. The scope and SLA are defined in the applicable agreement based on your needs.",
    },
    {
      id: "item-5",
      question: "How do I get a quote for my project?",
      answer:
        "Reach out through our Contact Us page with a brief description of what you need. We'll get back to you to schedule a conversation and provide an estimate.",
    },
  ],
};

// ─── Footer ───────────────────────────────────────────────────────────────────
export const footerData = {
  description:
    "TechBinaryz builds custom software, web platforms, and mobile applications — and ships its own flagship product. We turn technical requirements into production-ready solutions.",
  copyright: "© 2026 TechBinaryz. All Rights Reserved.",
  socials: {
    linkedin: "https://linkedin.com/in/maintbf",
    twitter: "https://x.com",
    github: "https://github.com",
    facebook: "https://facebook.com",
  },
  columns: [
    {
      heading: "Services",
      links: [
        { label: "Web Development", href: "/products" },
        { label: "Mobile Apps", href: "/products" },
        { label: "Custom Software", href: "/products" },
        { label: "Our Product", href: "/products" },
        { label: "Consulting", href: "/contact-us" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About Us", href: "/about-us" },
        { label: "Contact Us", href: "/contact-us" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms & Conditions", href: "/terms-and-conditions" },
      ],
    },
    {
      heading: "Account",
      links: [
        { label: "Login", href: "/sign-in" },
        { label: "Sign Up", href: "/sign-in" },
        { label: "Support", href: "/contact-us" },
      ],
    },
  ],
};
