export const appConfig = {
  // Basic App Information
  name: "Tech Binaryz",
  tagline: "Digital Solutions & Development",
  description:
    "Transform your ideas into powerful digital solutions with our cutting-edge technology stack and expert development team.",

  // SEO & Meta
  meta: {
    title: "Tech Binaryz - Digital Solutions & Development",
    description:
      "Transform your ideas into powerful digital solutions with our cutting-edge technology stack and expert development team.",
    keywords: [
      "web development",
      "mobile apps",
      "UI/UX design",
      "digital solutions",
      "tech consulting",
    ],
    author: "Tech Binaryz Team",
    ogImage: "/og-image.jpg", // Add your OG image path
  },

  // Company Information
  company: {
    fullName: "Tech Binaryz Solutions Inc.",
    foundedYear: 2016,
    location: {
      address: "123 Tech Street, Digital City, DC 12345",
      city: "Digital City",
      state: "DC",
      zipCode: "12345",
      country: "United States",
    },
    contact: {
      email: "hello@Tech Binaryz.com",
      phone: "+1 (555) 123-4567",
      supportEmail: "support@Tech Binaryz.com",
      salesEmail: "sales@Tech Binaryz.com",
    },
    businessHours: {
      weekdays: "Monday - Friday: 9:00 AM - 6:00 PM",
      weekend: "Weekend support available",
      timezone: "EST",
    },
  },

  // Social Media Links
  social: {
    github: "https://github.com/Tech Binaryz",
    twitter: "https://twitter.com/Tech Binaryz",
    linkedin: "https://linkedin.com/company/Tech Binaryz",
    instagram: "https://instagram.com/Tech Binaryz",
    facebook: "https://facebook.com/Tech Binaryz",
  },

  // Navigation
  navigation: {
    main: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
    footer: {
      services: [
        { name: "Web Development", href: "/services/web-development" },
        { name: "Mobile Apps", href: "/services/mobile-apps" },
        { name: "UI/UX Design", href: "/services/ui-ux-design" },
        { name: "Consulting", href: "/services/consulting" },
      ],
      company: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
      ],
      legal: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
      ],
    },
  },

  // Theme Configuration
  theme: {
    defaultTheme: "system" as const,
    storageKey: "Tech Binaryz-theme",
  },

  // Features & Services
  services: [
    {
      id: "web-development",
      name: "Web Development",
      description: "Modern, responsive websites and web applications",
      icon: "Code",
    },
    {
      id: "mobile-apps",
      name: "Mobile Apps",
      description: "Native and cross-platform mobile applications",
      icon: "Smartphone",
    },
    {
      id: "ui-ux-design",
      name: "UI/UX Design",
      description: "User-centered design for optimal experiences",
      icon: "Palette",
    },
    {
      id: "consulting",
      name: "Consulting",
      description: "Strategic technology consulting and planning",
      icon: "Users",
    },
  ],

  // Statistics
  stats: {
    projectsCompleted: "500+",
    happyClients: "250+",
    yearsExperience: "8+",
    teamMembers: "50+",
    countriesServed: "15+",
    technologiesMastered: "30+",
  },

  // Core Values
  values: [
    {
      title: "Innovation",
      description:
        "We constantly explore new technologies and methodologies to deliver cutting-edge solutions.",
      icon: "Lightbulb",
    },
    {
      title: "Collaboration",
      description:
        "We believe in the power of teamwork to achieve extraordinary results.",
      icon: "Users",
    },
    {
      title: "Reliability",
      description:
        "Our clients trust us to deliver on our promises with excellence.",
      icon: "Shield",
    },
    {
      title: "Passion",
      description:
        "We love what we do, and it shows in every project we undertake.",
      icon: "Heart",
    },
  ],

  // Project Types for Contact Form
  projectTypes: [
    { value: "web-development", label: "Web Development" },
    { value: "mobile-app", label: "Mobile App" },
    { value: "ui-ux-design", label: "UI/UX Design" },
    { value: "e-commerce", label: "E-commerce" },
    { value: "consulting", label: "Consulting" },
    { value: "other", label: "Other" },
  ],

  // Budget Ranges for Contact Form
  budgetRanges: [
    { value: "under-10k", label: "Under $10,000" },
    { value: "10k-25k", label: "$10,000 - $25,000" },
    { value: "25k-50k", label: "$25,000 - $50,000" },
    { value: "50k-100k", label: "$50,000 - $100,000" },
    { value: "over-100k", label: "Over $100,000" },
  ],

  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "https://api.Tech Binaryz.com",
    version: "v1",
  },

  // Feature Flags
  features: {
    blog: false,
    portfolio: false,
    careers: false,
    newsletter: true,
    darkMode: true,
    analytics: true,
  },
} as const;

// Type exports for TypeScript
export type AppConfig = typeof appConfig;
export type NavigationItem = (typeof appConfig.navigation.main)[0];
export type Service = (typeof appConfig.services)[0];
export type Stat = keyof typeof appConfig.stats;
export type Value = (typeof appConfig.values)[0];
