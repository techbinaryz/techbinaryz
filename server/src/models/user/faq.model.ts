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
        timestamps: { createdAt: "asked_on" },
    }
);

export const Faq = mongoose.model<IFaq>("Faq", faqSchema);