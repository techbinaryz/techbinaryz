// Feedbacks from user

import { FastifyRequest, FastifyReply } from "fastify";
import { Feedback } from "../../models/user/feedback.model";
import { User } from "../../models/user/user.model";
import { Types } from "mongoose";

// GET all feedbacks
export const getAllFeedbacks = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { limit = 10, page = 1 } = request.query as { limit?: number; page?: number };

    const skip = (Number(page) - 1) * Number(limit);

    const feedbacks = await Feedback.find()
      .populate("posted_by", "first_name last_name email designation")
      .sort({ posted_at: -1 })
      .limit(Number(limit))
      .skip(skip);

    const total = await Feedback.countDocuments();

    reply.status(200).send({
      success: true,
      data: feedbacks,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: "Failed to fetch feedbacks",
    });
  }
};

// GET single feedback by ID
export const getFeedbackById = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { id } = request.params as { id: string };

    if (!Types.ObjectId.isValid(id)) {
      reply.status(400).send({
        success: false,
        error: "Invalid feedback ID",
      });
      return;
    }

    const feedback = await Feedback.findById(id).populate(
      "posted_by",
      "first_name last_name email designation"
    );

    if (!feedback) {
      reply.status(404).send({
        success: false,
        error: "Feedback not found",
      });
      return;
    }

    reply.status(200).send({
      success: true,
      data: feedback,
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: "Failed to fetch feedback",
    });
  }
};

// POST create new feedback
export const createFeedback = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { feedback, designation } = request.body as {
      feedback?: string;
      designation?: string;
    };

    // Validation
    if (!feedback || !feedback.trim()) {
      reply.status(400).send({
        success: false,
        error: "Feedback text is required",
      });
      return;
    }

    if (!request.user) {
      reply.status(401).send({
        success: false,
        error: "User not authenticated",
      });
      return;
    }

    // Get user's designation from their profile if not provided
    let userDesignation = designation;
    if (!userDesignation) {
      const user = await User.findById(request.user._id).select("designation");
      userDesignation = user?.designation;
    }

    const newFeedback = await Feedback.create({
      feedback: feedback.trim(),
      posted_by: request.user._id,
      designation: userDesignation,
    });

    const populatedFeedback = await Feedback.findById(newFeedback._id).populate(
      "posted_by",
      "first_name last_name email designation"
    );

    reply.status(201).send({
      success: true,
      message: "Feedback created successfully",
      data: populatedFeedback,
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: "Failed to create feedback",
    });
  }
};

// PUT update feedback
export const updateFeedback = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { id } = request.params as { id: string };
    const { feedback, designation } = request.body as {
      feedback?: string;
      designation?: string;
    };

    if (!Types.ObjectId.isValid(id)) {
      reply.status(400).send({
        success: false,
        error: "Invalid feedback ID",
      });
      return;
    }

    const existingFeedback = await Feedback.findById(id);

    if (!existingFeedback) {
      reply.status(404).send({
        success: false,
        error: "Feedback not found",
      });
      return;
    }

    // Check if user is the owner or admin
    if (!request.user) {
      reply.status(401).send({
        success: false,
        error: "User not authenticated",
      });
      return;
    }

    if (existingFeedback.posted_by.toString() !== request.user._id.toString()) {
      reply.status(403).send({
        success: false,
        error: "You can only update your own feedback",
      });
      return;
    }

    // Update fields
    if (feedback !== undefined) existingFeedback.feedback = feedback.trim();
    if (designation !== undefined) existingFeedback.designation = designation;

    await existingFeedback.save();

    const updatedFeedback = await Feedback.findById(id).populate(
      "posted_by",
      "first_name last_name email designation"
    );

    reply.status(200).send({
      success: true,
      message: "Feedback updated successfully",
      data: updatedFeedback,
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: "Failed to update feedback",
    });
  }
};

// DELETE feedback
export const deleteFeedback = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { id } = request.params as { id: string };

    if (!Types.ObjectId.isValid(id)) {
      reply.status(400).send({
        success: false,
        error: "Invalid feedback ID",
      });
      return;
    }

    const feedback = await Feedback.findById(id);

    if (!feedback) {
      reply.status(404).send({
        success: false,
        error: "Feedback not found",
      });
      return;
    }

    // Check if user is the owner or admin
    if (!request.user) {
      reply.status(401).send({
        success: false,
        error: "User not authenticated",
      });
      return;
    }

    if (feedback.posted_by.toString() !== request.user._id.toString()) {
      reply.status(403).send({
        success: false,
        error: "You can only delete your own feedback",
      });
      return;
    }

    await Feedback.findByIdAndDelete(id);

    reply.status(200).send({
      success: true,
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: "Failed to delete feedback",
    });
  }
};


