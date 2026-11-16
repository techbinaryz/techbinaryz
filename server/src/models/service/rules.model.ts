import mongoose, { Document, Schema, Types } from "mongoose";

export type RuleCategory = "general" | "privacy" | "security" | "content" | "user_conduct" | "other";

export interface IRule extends Document {
  title: string;
  description: string;
  category: RuleCategory;
  rule_number?: string; // e.g., "1.1", "2.3.4"
  is_active: boolean;
  is_mandatory: boolean; // Whether acceptance is mandatory
  display_order: number;
  effective_date?: Date; // When this rule becomes effective
  last_modified_by: Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

const ruleSchema = new Schema<IRule>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["general", "privacy", "security", "content", "user_conduct", "other"],
      default: "general",
    },
    rule_number: { type: String, trim: true },
    is_active: { type: Boolean, default: true },
    is_mandatory: { type: Boolean, default: false },
    display_order: { type: Number, default: 0 },
    effective_date: { type: Date },
    last_modified_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

// Indexes for efficient queries
ruleSchema.index({ is_active: 1, display_order: 1 });
ruleSchema.index({ category: 1 });
ruleSchema.index({ rule_number: 1 });

export const Rule = mongoose.model<IRule>("Rule", ruleSchema);
