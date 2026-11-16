import mongoose, { Schema } from "mongoose";
import { IFailedLoginAttempt } from "../../interfaces/auth.interfaces";

// Re-export types for backward compatibility
export { IFailedLoginAttempt };

const failedLoginAttemptSchema = new Schema<IFailedLoginAttempt>(
  {
    ip: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
  }
);

// Index for querying recent attempts
failedLoginAttemptSchema.index({ ip: 1, email: 1, created_at: 1 });

export const FailedLoginAttempt = mongoose.model<IFailedLoginAttempt>(
  "FailedLoginAttempt",
  failedLoginAttemptSchema
);
