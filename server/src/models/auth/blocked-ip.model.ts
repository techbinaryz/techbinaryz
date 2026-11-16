import mongoose, { Schema } from "mongoose";
import { IBlockedIp } from "../../interfaces/auth.interfaces";

// Re-export types for backward compatibility
export { IBlockedIp };

const blockedIpSchema = new Schema<IBlockedIp>(
  {
    ip: { type: String, required: true },
    email: { type: String, required: true },
    blocked_until: { type: Date, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
  }
);

// Compound index for IP + email lookup
blockedIpSchema.index({ ip: 1, email: 1 });

// Auto-delete expired blocks
blockedIpSchema.index({ blocked_until: 1 }, { expireAfterSeconds: 0 });

export const BlockedIp = mongoose.model<IBlockedIp>("BlockedIp", blockedIpSchema);
