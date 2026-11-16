import { Document, Types } from "mongoose";

export type ProjectStatus = "planning" | "in_progress" | "completed" | "on_hold" | "cancelled";
export type ProjectCategory = "web" | "mobile" | "desktop" | "ai_ml" | "blockchain" | "other";

export interface IProject extends Document {
  title: string;
  description: string;
  short_description?: string;
  category: ProjectCategory;
  status: ProjectStatus;
  technologies: string[]; // Array of tech stack used
  image?: string; // Main project image
  gallery?: string[]; // Additional project images
  github_url?: string;
  live_url?: string;
  start_date?: Date;
  end_date?: Date;
  client_name?: string;
  team_size?: number;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  created_by: Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

export type RuleCategory = "general" | "privacy" | "security" | "content" | "user_conduct" | "other";

export interface IRule extends Document {
  title: string;
  description: string;
  category: RuleCategory;
  rule_number?: string; // e.g., "1.1", "2.3.4"
  is_active: boolean;
  is_mandatory: boolean; // Whether acceptance is mandatory
  display_order: number;
  effective_date?: Date; // When this rule becomes effective
  last_modified_by: Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

export type ServiceCategory =
  | "web_development"
  | "mobile_development"
  | "cloud_services"
  | "consulting"
  | "design"
  | "custom_software"
  | "maintainance"
  | "other";

export type PricingType = "fixed" | "hourly" | "monthly" | "custom" | "contact";

export interface IService extends Document {
  name: string;
  description: string;
  short_description?: string;
  category: ServiceCategory;
  icon?: string; // Icon or image for the service
  features: string[]; // Array of key features
  pricing_type: PricingType;
  starting_price?: number; // Optional starting price
  currency?: string; // e.g., "USD", "INR"
  is_active: boolean;
  is_featured: boolean;
  display_order: number;
  deliverables?: string[]; // What client receives
  duration_estimate?: string; // e.g., "2-4 weeks"
  created_by: Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}
