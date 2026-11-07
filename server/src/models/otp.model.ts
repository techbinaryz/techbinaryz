import mongoose, { Document, Schema } from "mongoose";
import crypto from "crypto";

export type OtpPurpose = "login" | "register" | "reset";
export const MAX_OTP_ATTEMPTS = 5;

export interface IOtp extends Document {
  email: string;
  otp: string; // Stored as SHA-256 hash
  expires_at: Date;
  is_used: boolean;
  attempts: number;
  purpose: OtpPurpose;
  created_at: Date;
}

export const hashOtp = (otp: string): string =>
  crypto.createHash("sha256").update(String(otp)).digest("hex");

const otpSchema = new Schema<IOtp>(
  {
    email: { type: String, required: true, index: true },
    otp: { type: String, required: true },
    expires_at: { type: Date, required: true },
    is_used: { type: Boolean, default: false },
    attempts: { type: Number, default: 0 },
    purpose: {
      type: String,
      enum: ["login", "register", "reset"],
      default: "login",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
  }
);

// Auto-delete expired OTPs
otpSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

export const Otp = mongoose.model<IOtp>("Otp", otpSchema);

/**
 * Verify a submitted OTP and consume it atomically
 */
export async function verifyAndConsumeOtp(
  email: string,
  submitted: string,
  purpose: OtpPurpose
): Promise<{ ok: boolean }> {
  const record = await Otp.findOne({
    email,
    purpose,
    is_used: false,
    expires_at: { $gt: new Date() },
  });

  if (!record) return { ok: false };

  if (record.otp === hashOtp(submitted)) {
    // Atomic claim: only the first concurrent verify flips is_used
    const claimed = await Otp.findOneAndUpdate(
      { _id: record._id, is_used: false },
      { $set: { is_used: true } }
    );
    return { ok: !!claimed };
  }

  // Wrong code - count the attempt and burn the OTP once the limit is hit
  const attempts = (record.attempts ?? 0) + 1;
  await Otp.updateOne(
    { _id: record._id },
    attempts >= MAX_OTP_ATTEMPTS ? { $set: { attempts, is_used: true } } : { $set: { attempts } }
  );
  return { ok: false };
}
