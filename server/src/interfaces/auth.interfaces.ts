import { Document, Types } from "mongoose";

export type OtpPurpose = "login" | "register" | "reset" | "admin_login";

export interface IRefreshToken extends Document {
  token: string;
  user_id: Types.ObjectId;
  family_id: string;
  expires_at: Date;
  is_revoked: boolean;
  replaced_by?: string;
  revoked_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface IOtp extends Document {
  email: string;
  otp: string; // Stored as SHA-256 hash
  expires_at: Date;
  is_used: boolean;
  attempts: number;
  purpose: OtpPurpose;
  created_at: Date;
}

export interface IBlockedIp extends Document {
  ip: string;
  email: string;
  blocked_until: Date;
  created_at: Date;
}

export interface IFailedLoginAttempt extends Document {
  ip: string;
  email: string;
  created_at: Date;
}
