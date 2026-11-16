import { Document, Types } from "mongoose";

export type AccountStatus = "active" | "deactivated" | "deleted" | "suspicious";

export interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  designation?: string;
  role: "admin" | "user";
  account_status: AccountStatus;
  is_email_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IFeedback extends Document {
  feedback: string;
  posted_by: Types.ObjectId;
  designation?: string;
  posted_at: Date;
}

export interface IFaq extends Document {
  question: string;
  answer: string;
  asked_by: Types.ObjectId;
  asked_on: Date;
}

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
