import {
  Code,
  Layers,
  Terminal,
  Box,
  Rocket,
  Wrench,
  Zap,
  ShieldCheck,
  Globe
} from "lucide-react";

export const headerData = {
  title: "AI Starter Kit Clone",
  logoText: "AI.Kit",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact Us", href: "/contact-us" },
  ],
  ctaText: "Get Started",
};

export const transformData = {
  heading: "Transform Your Workflow with Intelligent Tools",
  subheading: "Deploy generative AI solutions faster than ever with our state-of-the-art starter kit designed for ambitious developers.",
  primaryAction: "Start Building Free",
  secondaryAction: "Book a Demo",
  stats: [
    { label: "Active Users", value: "10K+" },
    { label: "Time Saved", value: "100k+ Hrs" },
    { label: "Uptime", value: "99.9%" }
  ]
};

export const coreData = {
  title: "Core Functionalities",
  subtitle: "Everything you need to build next-generation applications.",
  features: [
    { title: "Fast API integration", description: "Seamlessly connect with leading AI models like GPT-4 and Claude.", icon: Zap },
    { title: "Enterprise Grade Security", description: "Your data stays yours. SOC2 compliance ready.", icon: ShieldCheck },
    { title: "Global CDN", description: "Lightning fast responses anywhere in the world.", icon: Globe },
  ]
};

export const toolsData = {
  title: "Integrated Developer Tools",
  description: "A complete ecosystem of tools curated for building intelligent apps.",
  toolsList: [
    { name: "VS Code Extension", description: "Lint and auto-complete your API requests instantly.", icon: Code },
    { name: "CLI Tool", description: "Scaffold new AI projects in seconds from your terminal.", icon: Terminal },
    { name: "Visual Builder", description: "Drag and drop workflow builder for non-technical team members.", icon: Box },
    { name: "Analytics Agent", description: "Built-in dashboards to track token usage and costs.", icon: Layers },
  ]
};

export const keyData = {
  title: "Key Advantages",
  advantages: [
    { title: "Performance First", description: "Optimized for speed, Core Web Vitals, and real-world scale.", icon: Rocket },
    { title: "Clean Architecture", description: "Modular. Typed. Structured. Built to extend or rip apart without collapsing the system.", icon: Layers },
    { title: "Developer Experience", description: "Clear documentation. Predictable structure. CLI-first mindset.", icon: Wrench },
  ]
};

export const faqData = {
  title: "Frequently Asked Questions",
  questions: [
    { question: "Is this open source?", answer: "The core engine is open source under the MIT license, with premium enterprise extensions." },
    { question: "Do you support local LLMs?", answer: "Yes, you can easily plug in Ollama or LM Studio endpoints in the configuration file." },
    { question: "What is your refund policy?", answer: "We offer a 30-day money-back guarantee for all premium tiers if you are not satisfied." },
  ]
};

export const navigationData = {
  links: [
    { title: "Features", url: "#features" },
    { title: "Pricing", url: "#pricing" },
    { title: "Documentation", url: "/docs" },
    { title: "Blog", url: "/blog" },
  ]
};

export const footerData = {
  copyright: "© 2026 AI Starter Kit. All rights reserved.",
  socials: [
    { name: "Twitter", url: "#" },
    { name: "GitHub", url: "#" },
    { name: "LinkedIn", url: "#" },
  ]
};
