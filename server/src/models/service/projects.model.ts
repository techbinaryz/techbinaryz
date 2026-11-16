import mongoose, { Schema } from "mongoose";
import { IProject, ProjectStatus, ProjectCategory } from "../../interfaces/service.interfaces";

// Re-export types for backward compatibility
export { IProject, ProjectStatus, ProjectCategory };

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
