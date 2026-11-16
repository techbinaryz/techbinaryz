// FAQs (Frequently Asked Questions)

import { FastifyRequest, FastifyReply } from "fastify";
import { Faq } from "../../models/user/faq.model";
import { Types } from "mongoose";

// GET all FAQs
export const getAllFaqs = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { limit = 10, page = 1 } = request.query as { limit?: number; page?: number };

    const skip = (Number(page) - 1) * Number(limit);

    const faqs = await Faq.find()
      .populate("asked_by", "first_name last_name email designation")
      .sort({ asked_on: -1 })
      .limit(Number(limit))
      .skip(skip);

    const total = await Faq.countDocuments();

    reply.status(200).send({
      success: true,
      data: faqs,
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
      error: "Failed to fetch FAQs",
    });
  }
};

// GET single FAQ by ID
export const getFaqById = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { id } = request.params as { id: string };

    if (!Types.ObjectId.isValid(id)) {
      reply.status(400).send({
        success: false,
        error: "Invalid FAQ ID",
      });
      return;
    }

    const faq = await Faq.findById(id).populate(
      "asked_by",
      "first_name last_name email designation"
    );

    if (!faq) {
      reply.status(404).send({
        success: false,
        error: "FAQ not found",
      });
      return;
    }

    reply.status(200).send({
      success: true,
      data: faq,
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: "Failed to fetch FAQ",
    });
  }
};

// POST create new FAQ
export const createFaq = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { question, answer } = request.body as {
      question?: string;
      answer?: string;
    };

    // Validation
    if (!question || !question.trim()) {
      reply.status(400).send({
        success: false,
        error: "Question is required",
      });
      return;
    }

    if (!answer || !answer.trim()) {
      reply.status(400).send({
        success: false,
        error: "Answer is required",
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

    const newFaq = await Faq.create({
      question: question.trim(),
      answer: answer.trim(),
      asked_by: request.user._id,
    });

    const populatedFaq = await Faq.findById(newFaq._id).populate(
      "asked_by",
      "first_name last_name email designation"
    );

    reply.status(201).send({
      success: true,
      message: "FAQ created successfully",
      data: populatedFaq,
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: "Failed to create FAQ",
    });
  }
};

// PUT update FAQ
export const updateFaq = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { id } = request.params as { id: string };
    const { question, answer } = request.body as {
      question?: string;
      answer?: string;
    };

    if (!Types.ObjectId.isValid(id)) {
      reply.status(400).send({
        success: false,
        error: "Invalid FAQ ID",
      });
      return;
    }

    const existingFaq = await Faq.findById(id);

    if (!existingFaq) {
      reply.status(404).send({
        success: false,
        error: "FAQ not found",
      });
      return;
    }

    // Check if user is authenticated
    if (!request.user) {
      reply.status(401).send({
        success: false,
        error: "User not authenticated",
      });
      return;
    }

    // Check if user is the owner
    if (existingFaq.asked_by.toString() !== request.user._id.toString()) {
      reply.status(403).send({
        success: false,
        error: "You can only update your own FAQ",
      });
      return;
    }

    // Update fields
    if (question !== undefined) existingFaq.question = question.trim();
    if (answer !== undefined) existingFaq.answer = answer.trim();

    await existingFaq.save();

    const updatedFaq = await Faq.findById(id).populate(
      "asked_by",
      "first_name last_name email designation"
    );

    reply.status(200).send({
      success: true,
      message: "FAQ updated successfully",
      data: updatedFaq,
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: "Failed to update FAQ",
    });
  }
};

// DELETE FAQ
export const deleteFaq = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { id } = request.params as { id: string };

    if (!Types.ObjectId.isValid(id)) {
      reply.status(400).send({
        success: false,
        error: "Invalid FAQ ID",
      });
      return;
    }

    const faq = await Faq.findById(id);

    if (!faq) {
      reply.status(404).send({
        success: false,
        error: "FAQ not found",
      });
      return;
    }

    // Check if user is authenticated
    if (!request.user) {
      reply.status(401).send({
        success: false,
        error: "User not authenticated",
      });
      return;
    }

    // Check if user is the owner
    if (faq.asked_by.toString() !== request.user._id.toString()) {
      reply.status(403).send({
        success: false,
        error: "You can only delete your own FAQ",
      });
      return;
    }

    await Faq.findByIdAndDelete(id);

    reply.status(200).send({
      success: true,
      message: "FAQ deleted successfully",
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: "Failed to delete FAQ",
    });
  }
};
