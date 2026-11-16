import mongoose, { Schema } from "mongoose";
import { IRefreshToken } from "../../interfaces/auth.interfaces";

// Re-export types for backward compatibility
export { IRefreshToken };

const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    token: { type: String, required: true, unique: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    family_id: { type: String, required: true, index: true },
    expires_at: { type: Date, required: true },
    is_revoked: { type: Boolean, default: false },
    replaced_by: { type: String },
    revoked_at: { type: Date },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

// Auto-delete expired tokens
refreshTokenSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

export const RefreshToken = mongoose.model<IRefreshToken>("RefreshToken", refreshTokenSchema);
