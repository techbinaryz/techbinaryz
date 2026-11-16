import mongoose, { Schema } from "mongoose";
import { IPartner } from "../../interfaces/user.interfaces";

// Re-export types for backward compatibility
export { IPartner };

const partnerSchema = new Schema<IPartner>(
  {
    name: { type: String, required: true, trim: true },
    logo: { type: String, required: true }, // URL or path to logo image
    website: { type: String, trim: true },
    description: { type: String, trim: true },
    is_active: { type: Boolean, default: true },
    display_order: { type: Number, default: 0 }, // For controlling display sequence
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

// Index for faster queries
partnerSchema.index({ is_active: 1, display_order: 1 });

export const Partner = mongoose.model<IPartner>("Partner", partnerSchema);
