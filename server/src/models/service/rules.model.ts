import mongoose, { Schema } from "mongoose";
import { IRule, RuleCategory } from "../../interfaces/service.interfaces";

// Re-export types for backward compatibility
export { IRule, RuleCategory };

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
