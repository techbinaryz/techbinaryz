// Portfolio API Types

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  unreadCount?: number;
}

// Hero Section
export interface HeroSection {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateHeroSection {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
  isActive?: boolean;
}

// Service Section
export interface ServiceSection {
  _id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceSection {
  title: string;
  description: string;
  icon: string;
  order?: number;
  isActive?: boolean;
}

// Project Section
export interface ProjectSection {
  _id: string;
  name: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
  featured: boolean;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectSection {
  name: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
  featured?: boolean;
  order?: number;
  isActive?: boolean;
}

// Testimonial Section
export interface TestimonialSection {
  _id: string;
  clientName: string;
  clientPosition: string;
  clientCompany: string;
  clientImage?: string;
  testimonial: string;
  rating: number;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTestimonialSection {
  clientName: string;
  clientPosition: string;
  clientCompany: string;
  clientImage?: string;
  testimonial: string;
  rating?: number;
  order?: number;
  isActive?: boolean;
}

// Team Member
export interface TeamMember {
  _id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTeamMember {
  name: string;
  position: string;
  bio: string;
  image: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  order?: number;
  isActive?: boolean;
}

// About Section
export interface AboutSection {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  mission: string;
  vision: string;
  values: string[];
  foundedYear: number;
  teamSize: number;
  projectsCompleted: number;
  clientsSatisfied: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAboutSection {
  title: string;
  subtitle: string;
  description: string;
  mission: string;
  vision: string;
  values: string[];
  foundedYear: number;
  teamSize?: number;
  projectsCompleted?: number;
  clientsSatisfied?: number;
  isActive?: boolean;
}

// Contact Info
export interface ContactInfo {
  _id: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  mapUrl?: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    github?: string;
  };
  businessHours: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactInfo {
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  mapUrl?: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    github?: string;
  };
  businessHours?: string;
  isActive?: boolean;
}

// Contact Message
export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  isReplied: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactMessage {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Stat Section
export interface StatSection {
  _id: string;
  label: string;
  value: number;
  suffix?: string;
  icon: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStatSection {
  label: string;
  value: number;
  suffix?: string;
  icon: string;
  order?: number;
  isActive?: boolean;
}
