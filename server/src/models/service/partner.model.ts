import mongoose, { Document, Schema } from "mongoose";

export interface IPartner extends Document {
  name: string;
  logo: string;
  website?: string;
  description?: string;
  is_active: boolean;
  display_order: number;
  created_at: Date;
  updated_at: Date;
}

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
