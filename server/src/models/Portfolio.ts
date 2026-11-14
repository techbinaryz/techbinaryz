import mongoose, { Schema, Document } from "mongoose";

// Hero Section (Home Page)
export interface IHeroSection extends Document {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const HeroSectionSchema = new Schema<IHeroSection>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    ctaText: { type: String, required: true },
    ctaLink: { type: String, required: true },
    backgroundImage: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Services/Features Section
export interface IServiceSection extends Document {
  title: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSectionSchema = new Schema<IServiceSection>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Projects/Portfolio Section
export interface IProjectSection extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSectionSchema = new Schema<IProjectSection>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    technologies: [{ type: String }],
    liveUrl: { type: String },
    githubUrl: { type: String },
    category: { type: String, required: true },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Testimonials Section
export interface ITestimonialSection extends Document {
  clientName: string;
  clientPosition: string;
  clientCompany: string;
  clientImage?: string;
  testimonial: string;
  rating: number;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSectionSchema = new Schema<ITestimonialSection>(
  {
    clientName: { type: String, required: true },
    clientPosition: { type: String, required: true },
    clientCompany: { type: String, required: true },
    clientImage: { type: String },
    testimonial: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Team Members Section (About Us)
export interface ITeamMember extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    bio: { type: String, required: true },
    image: { type: String, required: true },
    email: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    github: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// About Us Section
export interface IAboutSection extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const AboutSectionSchema = new Schema<IAboutSection>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    mission: { type: String, required: true },
    vision: { type: String, required: true },
    values: [{ type: String }],
    foundedYear: { type: Number, required: true },
    teamSize: { type: Number, default: 0 },
    projectsCompleted: { type: Number, default: 0 },
    clientsSatisfied: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Contact Info Section
export interface IContactInfo extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const ContactInfoSchema = new Schema<IContactInfo>(
  {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true },
    mapUrl: { type: String },
    socialMedia: {
      facebook: String,
      twitter: String,
      linkedin: String,
      instagram: String,
      github: String,
    },
    businessHours: { type: String, default: "Mon-Fri: 9AM-6PM" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Contact Messages (submissions from contact form)
export interface IContactMessage extends Document {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  isReplied: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    isReplied: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Statistics/Achievements Section
export interface IStatSection extends Document {
  label: string;
  value: number;
  suffix?: string;
  icon: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const StatSectionSchema = new Schema<IStatSection>(
  {
    label: { type: String, required: true },
    value: { type: Number, required: true },
    suffix: { type: String },
    icon: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Export all models
export const HeroSection = mongoose.model<IHeroSection>("HeroSection", HeroSectionSchema);
export const ServiceSection = mongoose.model<IServiceSection>("ServiceSection", ServiceSectionSchema);
export const ProjectSection = mongoose.model<IProjectSection>("ProjectSection", ProjectSectionSchema);
export const TestimonialSection = mongoose.model<ITestimonialSection>("TestimonialSection", TestimonialSectionSchema);
export const TeamMember = mongoose.model<ITeamMember>("TeamMember", TeamMemberSchema);
export const AboutSection = mongoose.model<IAboutSection>("AboutSection", AboutSectionSchema);
export const ContactInfo = mongoose.model<IContactInfo>("ContactInfo", ContactInfoSchema);
export const ContactMessage = mongoose.model<IContactMessage>("ContactMessage", ContactMessageSchema);
export const StatSection = mongoose.model<IStatSection>("StatSection", StatSectionSchema);
