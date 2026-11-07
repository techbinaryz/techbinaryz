import mongoose, { Document, Schema } from "mongoose";

export type AccountStatus = "active" | "deactivated" | "deleted" | "suspicious";

export interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: "admin"; // Only admin role exists
  account_status: AccountStatus;
  is_email_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

const userSchema = new Schema<IUser>(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, default: "", trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin"], default: "admin" },
    account_status: {
      type: String,
      enum: ["active", "deactivated", "deleted", "suspicious"],
      default: "active",
    },
    is_email_verified: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

// Index for faster email lookups
userSchema.index({ email: 1 });

export const User = mongoose.model<IUser>("User", userSchema);
