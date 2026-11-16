// Core Rules and principals

import { FastifyRequest, FastifyReply } from "fastify";
import { Rule, RuleCategory } from "../../models/service/rules.model";
import { Types } from "mongoose";

// GET all rules
export const getAllRules = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { limit = 10, page = 1, is_active, category } = request.query as { 
      limit?: number; 
      page?: number;
      is_active?: string;
      category?: RuleCategory;
    };

    const skip = (Number(page) - 1) * Number(limit);

    // Build filter
    const filter: any = {};
    if (is_active !== undefined) {
      filter.is_active = is_active === "true";
    }
    if (category) {
      filter.category = category;
    }

    const rules = await Rule.find(filter)
      .populate("last_modified_by", "first_name last_name email")
      .sort({ display_order: 1, created_at: -1 })
      .limit(Number(limit))
      .skip(skip);

    const total = await Rule.countDocuments(filter);

    reply.status(200).send({
      success: true,
      data: rules,
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
      error: "Failed to fetch rules",
    });
  }
};

// GET single rule by ID
export const getRuleById = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { id } = request.params as { id: string };

    if (!Types.ObjectId.isValid(id)) {
      reply.status(400).send({
        success: false,
        error: "Invalid rule ID",
      });
      return;
    }

    const rule = await Rule.findById(id).populate(
      "last_modified_by",
      "first_name last_name email"
    );

    if (!rule) {
      reply.status(404).send({
        success: false,
        error: "Rule not found",
      });
      return;
    }

    reply.status(200).send({
      success: true,
      data: rule,
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: "Failed to fetch rule",
    });
  }
};

// POST create new rule
export const createRule = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { 
      title, 
      description, 
      category, 
      rule_number, 
      is_active, 
      is_mandatory, 
      display_order,
      effective_date 
    } = request.body as {
      title?: string;
      description?: string;
      category?: RuleCategory;
      rule_number?: string;
      is_active?: boolean;
      is_mandatory?: boolean;
      display_order?: number;
      effective_date?: Date;
    };

    // Validation
    if (!title || !title.trim()) {
      reply.status(400).send({
        success: false,
        error: "Rule title is required",
      });
      return;
    }

    if (!description || !description.trim()) {
      reply.status(400).send({
        success: false,
        error: "Rule description is required",
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

    const newRule = await Rule.create({
      title: title.trim(),
      description: description.trim(),
      category: category || "general",
      rule_number: rule_number?.trim(),
      is_active: is_active !== undefined ? is_active : true,
      is_mandatory: is_mandatory !== undefined ? is_mandatory : false,
      display_order: display_order !== undefined ? display_order : 0,
      effective_date: effective_date,
      last_modified_by: request.user._id,
    });

    const populatedRule = await Rule.findById(newRule._id).populate(
      "last_modified_by",
      "first_name last_name email"
    );

    reply.status(201).send({
      success: true,
      message: "Rule created successfully",
      data: populatedRule,
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: "Failed to create rule",
    });
  }
};

// PUT update rule
export const updateRule = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { id } = request.params as { id: string };
    const { 
      title, 
      description, 
      category, 
      rule_number, 
      is_active, 
      is_mandatory, 
      display_order,
      effective_date 
    } = request.body as {
      title?: string;
      description?: string;
      category?: RuleCategory;
      rule_number?: string;
      is_active?: boolean;
      is_mandatory?: boolean;
      display_order?: number;
      effective_date?: Date;
    };

    if (!Types.ObjectId.isValid(id)) {
      reply.status(400).send({
        success: false,
        error: "Invalid rule ID",
      });
      return;
    }

    const existingRule = await Rule.findById(id);

    if (!existingRule) {
      reply.status(404).send({
        success: false,
        error: "Rule not found",
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

    // Update fields
    if (title !== undefined) existingRule.title = title.trim();
    if (description !== undefined) existingRule.description = description.trim();
    if (category !== undefined) existingRule.category = category;
    if (rule_number !== undefined) existingRule.rule_number = rule_number.trim();
    if (is_active !== undefined) existingRule.is_active = is_active;
    if (is_mandatory !== undefined) existingRule.is_mandatory = is_mandatory;
    if (display_order !== undefined) existingRule.display_order = display_order;
    if (effective_date !== undefined) existingRule.effective_date = effective_date;
    existingRule.last_modified_by = request.user._id;

    await existingRule.save();

    const updatedRule = await Rule.findById(id).populate(
      "last_modified_by",
      "first_name last_name email"
    );

    reply.status(200).send({
      success: true,
      message: "Rule updated successfully",
      data: updatedRule,
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: "Failed to update rule",
    });
  }
};

// DELETE rule
export const deleteRule = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { id } = request.params as { id: string };

    if (!Types.ObjectId.isValid(id)) {
      reply.status(400).send({
        success: false,
        error: "Invalid rule ID",
      });
      return;
    }

    const rule = await Rule.findById(id);

    if (!rule) {
      reply.status(404).send({
        success: false,
        error: "Rule not found",
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

    await Rule.findByIdAndDelete(id);

    reply.status(200).send({
      success: true,
      message: "Rule deleted successfully",
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: "Failed to delete rule",
    });
  }
};