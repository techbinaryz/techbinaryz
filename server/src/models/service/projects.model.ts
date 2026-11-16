import mongoose, { Document, Schema, Types } from "mongoose";

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

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
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
        "other"],
      default: "web",
    },
    status: {
      type: String,
      enum: ["planning", "in_progress", "completed", "on_hold", "cancelled"],
      default: "planning",
    },
    technologies: { type: [String], default: [] },
    image: { type: String }, // URL or path to main image
    gallery: { type: [String], default: [] }, // Array of image URLs
    github_url: { type: String, trim: true },
    live_url: { type: String, trim: true },
    start_date: { type: Date },
    end_date: { type: Date },
    client_name: { type: String, trim: true },
    team_size: { type: Number, min: 1 },
    is_featured: { type: Boolean, default: false },
    is_published: { type: Boolean, default: false },
    display_order: { type: Number, default: 0 },
    created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

// Indexes for efficient queries
projectSchema.index({ is_published: 1, is_featured: 1, display_order: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ category: 1 });
projectSchema.index({ created_by: 1 });

export const Project = mongoose.model<IProject>("Project", projectSchema);
