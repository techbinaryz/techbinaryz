// The partners of TechBinaryz

import { FastifyRequest, FastifyReply } from "fastify";
import { Partner } from "../models/partner.model";
import { Types } from "mongoose";

// GET all partners
export const getAllPartners = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { limit = 10, page = 1, is_active } = request.query as { 
      limit?: number; 
      page?: number;
      is_active?: string;
    };

    const skip = (Number(page) - 1) * Number(limit);

    // Build filter
    const filter: any = {};
    if (is_active !== undefined) {
      filter.is_active = is_active === "true";
    }

    const partners = await Partner.find(filter)
      .sort({ display_order: 1, created_at: -1 })
      .limit(Number(limit))
      .skip(skip);

    const total = await Partner.countDocuments(filter);

    reply.status(200).send({
      success: true,
      data: partners,
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
      error: "Failed to fetch partners",
    });
  }
};

// GET single partner by ID
export const getPartnerById = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { id } = request.params as { id: string };

    if (!Types.ObjectId.isValid(id)) {
      reply.status(400).send({
        success: false,
        error: "Invalid partner ID",
      });
      return;
    }

    const partner = await Partner.findById(id);

    if (!partner) {
      reply.status(404).send({
        success: false,
        error: "Partner not found",
      });
      return;
    }

    reply.status(200).send({
      success: true,
      data: partner,
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: "Failed to fetch partner",
    });
  }
};

// POST create new partner
export const createPartner = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { name, logo, website, description, is_active, display_order } = request.body as {
      name?: string;
      logo?: string;
      website?: string;
      description?: string;
      is_active?: boolean;
      display_order?: number;
    };

    // Validation
    if (!name || !name.trim()) {
      reply.status(400).send({
        success: false,
        error: "Partner name is required",
      });
      return;
    }

    if (!logo || !logo.trim()) {
      reply.status(400).send({
        success: false,
        error: "Partner logo is required",
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

    const newPartner = await Partner.create({
      name: name.trim(),
      logo: logo.trim(),
      website: website?.trim(),
      description: description?.trim(),
      is_active: is_active !== undefined ? is_active : true,
      display_order: display_order !== undefined ? display_order : 0,
    });

    reply.status(201).send({
      success: true,
      message: "Partner created successfully",
      data: newPartner,
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: "Failed to create partner",
    });
  }
};

// PUT update partner
export const updatePartner = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { id } = request.params as { id: string };
    const { name, logo, website, description, is_active, display_order } = request.body as {
      name?: string;
      logo?: string;
      website?: string;
      description?: string;
      is_active?: boolean;
      display_order?: number;
    };

    if (!Types.ObjectId.isValid(id)) {
      reply.status(400).send({
        success: false,
        error: "Invalid partner ID",
      });
      return;
    }

    const existingPartner = await Partner.findById(id);

    if (!existingPartner) {
      reply.status(404).send({
        success: false,
        error: "Partner not found",
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
    if (name !== undefined) existingPartner.name = name.trim();
    if (logo !== undefined) existingPartner.logo = logo.trim();
    if (website !== undefined) existingPartner.website = website.trim();
    if (description !== undefined) existingPartner.description = description.trim();
    if (is_active !== undefined) existingPartner.is_active = is_active;
    if (display_order !== undefined) existingPartner.display_order = display_order;

    await existingPartner.save();

    reply.status(200).send({
      success: true,
      message: "Partner updated successfully",
      data: existingPartner,
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: "Failed to update partner",
    });
  }
};

// DELETE partner
export const deletePartner = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { id } = request.params as { id: string };

    if (!Types.ObjectId.isValid(id)) {
      reply.status(400).send({
        success: false,
        error: "Invalid partner ID",
      });
      return;
    }

    const partner = await Partner.findById(id);

    if (!partner) {
      reply.status(404).send({
        success: false,
        error: "Partner not found",
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

    await Partner.findByIdAndDelete(id);

    reply.status(200).send({
      success: true,
      message: "Partner deleted successfully",
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: "Failed to delete partner",
    });
  }
};