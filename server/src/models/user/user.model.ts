import mongoose, { Schema } from "mongoose";
import { IUser, AccountStatus } from "../../interfaces/user.interfaces";

// Re-export types for backward compatibility
export { IUser, AccountStatus };

const userSchema = new Schema<IUser>(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, default: "", trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    designation: { type: String, trim: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
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
