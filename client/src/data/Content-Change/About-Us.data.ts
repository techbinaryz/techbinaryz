import {
  Box,
  FileCheck2,
  Globe,
  Layers,
  Lock,
  Rocket,
  ShieldCheck,
  Terminal,
  Users,
} from "lucide-react";

// ─── Prompt (Hero section at top of About Us) ────────────────────────────────
// Sourced from: TermsAndConditions section 1 — "Our Services"
export const promptData = {
  heading: "Beyond the Brief.",
  subheading:
    "We provide software development, web and application development, technology solutions, software platforms, IT services, maintenance, support, and consulting — and we ship our own product alongside every client we work with.",
  primaryAction: { label: "Explore Our Services", href: "/products" },
  secondaryAction: { label: "Watch Overview" },
  trustedLabel: "Trusted by businesses across industries including...",
};

// ─── Creator (Company identity section) ──────────────────────────────────────
// Sourced from: TermsAndConditions section 5.2 — Custom Software & Deliverables
export const creatorData = {
  heading: "The Team",
  subheading:
    "We build software, platforms, and systems — not just prototypes. Every solution we deliver is scoped, engineered, and shipped with the same rigour we apply to our own product.",
  quote:
    '"Unless the agreement says otherwise, we own the craft. Our frameworks, our methods, our know-how — earned across every project we\'ve shipped."',
  techStack: [
    { src: "https://cdn.simpleicons.org/nextdotjs", alt: "Next.js" },
    { src: "https://cdn.simpleicons.org/react", alt: "React" },
    { src: "https://cdn.simpleicons.org/typescript", alt: "TypeScript" },
    { src: "https://cdn.simpleicons.org/nodedotjs", alt: "Node.js" },
    { src: "https://cdn.simpleicons.org/postgresql", alt: "PostgreSQL" },
    { src: "https://cdn.simpleicons.org/docker", alt: "Docker" },
  ],
};

// ─── Impact (Metrics / trust section) ────────────────────────────────────────
// Sourced from: TermsAndConditions section 9 — Service Availability + section 10 — Updates & Support
export const impactData = {
  heading: "The Commitment",
  subheading:
    "We make reasonable efforts to maintain availability and functionality across every solution we deliver — with structured support, timely updates, and security patches built into every engagement.",
  stats: [
    { label: "Projects Delivered", value: "50+" },
    { label: "Services Offered", value: "6+" },
    { label: "Support & Maintenance", value: "Ongoing" },
    { label: "Governing Law", value: "India" },
  ],
};

// ─── Pillars (Core principles — Bento grid) ───────────────────────────────────
// Sourced from:
//   - PrivacyPolicy section 8 — Data Security → "Security First"
//   - DataProcessingTerms section 3 — Confidentiality & Security → "Confidentiality"
//   - TermsAndConditions section 5.1 — TechBinaryz IP → "Craftsmanship"
//   - TermsAndConditions section 11 — Confidentiality → "Trust"
//   - DataProcessingTerms section 1 — Roles & Responsibilities → "Accountability"
export const pillarsData = {
  heading: "Core Principles",
  subheading:
    "We build systems. Not demos. Every principle here is reflected in how we operate, what we sign, and what we ship.",
  features: [
    {
      title: "Security First",
      description:
        "We maintain reasonable technical and organisational measures to protect data against unauthorised access, alteration, disclosure, misuse, loss, or destruction.",
      icon: ShieldCheck,
      cta: "Learn more",
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
      title: "Clean Architecture",
      description:
        "Modular, typed, and structured — our frameworks and reusable components are built to extend without collapsing the system.",
      icon: Layers,
      cta: "Learn more",
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
      title: "Developer Accountability",
      description:
        "We process data and deliver services only as necessary — with clear boundaries between what we own and what belongs to the customer.",
      icon: FileCheck2,
      cta: "Learn more",
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
      title: "Client Confidentiality",
      description:
        "Confidential information is protected with reasonable measures and used only for purposes related to the agreed business relationship.",
      icon: Lock,
      cta: "Learn more",
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      title: "Production Delivery",
      description:
        "We ship production-ready solutions — with updates, patches, and security fixes as part of every ongoing engagement.",
      icon: Rocket,
      cta: "Learn more",
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
  ],
};

// ─── Problem (What we solve + Mission) ────────────────────────────────────────
// Sourced from: TermsAndConditions section 1 — Our Services + section 3 — Customer Responsibilities
export const problemData = {
  problemHeading: "The Problem",
  problemParagraphs: [
    "Businesses spend too much time managing vendors, patching together off-the-shelf tools, and dealing with software that was never designed for their actual workflows.",
    "Timelines slip because requirements were misunderstood. Budgets inflate because infrastructure wasn't planned. Teams inherit systems they can't maintain.",
  ],
  missionHeading: "The Mission",
  missionParagraph:
    "TechBinaryz provides end-to-end technology solutions — from initial scoping through to deployment and ongoing support — so businesses can focus on what they actually do, not on managing broken software.",
};
