import mongoose, { Document, Schema, Types } from "mongoose";

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

const serviceSchema = new Schema<IService>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    short_description: { type: String, trim: true },
    category: {
      type: String,
      enum: [
        "web_development",
        "mobile_development",
        "cloud_services",
        "consulting",
        "design",
        "custom_software",
        "maintainance",
        "other",
      ],
      default: "web_development",
    },
    icon: { type: String }, // URL or path to icon/image
    features: { type: [String], default: [] },
    pricing_type: {
      type: String,
      enum: ["fixed", "hourly", "monthly", "custom", "contact"],
      default: "contact",
    },
    starting_price: { type: Number, min: 0 },
    currency: { type: String, default: "USD", trim: true },
    is_active: { type: Boolean, default: true },
    is_featured: { type: Boolean, default: false },
    display_order: { type: Number, default: 0 },
    deliverables: { type: [String], default: [] },
    duration_estimate: { type: String, trim: true },
    created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

// Indexes for efficient queries
serviceSchema.index({ is_active: 1, is_featured: 1, display_order: 1 });
serviceSchema.index({ category: 1 });
serviceSchema.index({ pricing_type: 1 });
serviceSchema.index({ created_by: 1 });

export const Service = mongoose.model<IService>("Service", serviceSchema);
