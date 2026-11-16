import mongoose, { Schema } from "mongoose";
import { IService, ServiceCategory, PricingType } from "../../interfaces/service.interfaces";

// Re-export types for backward compatibility
export { IService, ServiceCategory, PricingType };

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
