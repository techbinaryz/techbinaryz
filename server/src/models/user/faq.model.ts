import mongoose, { Schema, Document, Types } from "mongoose";

export interface IFaq extends Document {
    question: string;
    answer: string;
    asked_by: Types.ObjectId;
    asked_on: Date;
}

const faqSchema = new Schema<IFaq>(
    {
        question: { type: String, required: true, trim: true },
        answer: { type: String, required: true, trim: true },
        asked_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    {
        timestamps: { createdAt: "asked_on", updatedAt: false },
    }
);

// Index for faster queries by user
faqSchema.index({ asked_by: 1 });
faqSchema.index({ asked_on: -1 }); // Sort by most recent

export const Faq = mongoose.model<IFaq>("Faq", faqSchema);