import mongoose, { Schema } from "mongoose";
import { IFeedback } from "../../interfaces/user.interfaces";

// Re-export types for backward compatibility
export { IFeedback };

const feedbackSchema = new Schema<IFeedback>(
    {
        feedback: { type: String, required: true, trim: true },
        posted_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
        designation: { type: String, trim: true },
    },
    {
        timestamps: { createdAt: "posted_at", updatedAt: false },
    }
);

// Index for faster queries by user
feedbackSchema.index({ posted_by: 1 });
feedbackSchema.index({ posted_at: -1 }); // Sort by most recent

export const Feedback = mongoose.model<IFeedback>("Feedback", feedbackSchema);