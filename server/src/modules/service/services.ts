// Our services - What we build Section

import { FastifyRequest, FastifyReply } from "fastify";
import { Service, ServiceCategory, PricingType } from "../../models/service/services.model";
import { Types } from "mongoose";

// GET all services
export const getAllServices = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { limit = 10, page = 1, is_active, is_featured, category, pricing_type } = request.query as { 
      limit?: number; 
      page?: number;
      is_active?: string;
      is_featured?: string;
      category?: ServiceCategory;
      pricing_type?: PricingType;
    };

    const skip = (Number(page) - 1) * Number(limit);

    // Build filter
    const filter: any = {};
    if (is_active !== undefined) {
      filter.is_active = is_active === "true";
    }
    if (is_featured !== undefined) {
      filter.is_featured = is_featured === "true";
    }
    if (category) {
      filter.category = category;
    }
    if (pricing_type) {
      filter.pricing_type = pricing_type;
    }

    const services = await Service.find(filter)
      .populate("created_by", "first_name last_name email")
      .sort({ is_featured: -1, display_order: 1, created_at: -1 })
      .limit(Number(limit))
      .skip(skip);

    const total = await Service.countDocuments(filter);

    reply.status(200).send({
      success: true,
      data: services,
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
      error: "Failed to fetch services",
    });
  }
};

// GET single service by ID
export const getServiceById = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { id } = request.params as { id: string };

    if (!Types.ObjectId.isValid(id)) {
      reply.status(400).send({
        success: false,
        error: "Invalid service ID",
      });
      return;
    }

    const service = await Service.findById(id).populate(
      "created_by",
      "first_name last_name email"
    );

    if (!service) {
      reply.status(404).send({
        success: false,
        error: "Service not found",
      });
      return;
    }

    reply.status(200).send({
      success: true,
      data: service,
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: "Failed to fetch service",
    });
  }
};

// POST create new service
export const createService = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { 
      name,
      description,
      short_description,
      category,
      icon,
      features,
      pricing_type,
      starting_price,
      currency,
      is_active,
      is_featured,
      display_order,
      deliverables,
      duration_estimate
    } = request.body as {
      name?: string;
      description?: string;
      short_description?: string;
      category?: ServiceCategory;
      icon?: string;
      features?: string[];
      pricing_type?: PricingType;
      starting_price?: number;
      currency?: string;
      is_active?: boolean;
      is_featured?: boolean;
      display_order?: number;
      deliverables?: string[];
      duration_estimate?: string;
    };

    // Validation
    if (!name || !name.trim()) {
      reply.status(400).send({
        success: false,
        error: "Service name is required",
      });
      return;
    }

    if (!description || !description.trim()) {
      reply.status(400).send({
        success: false,
        error: "Service description is required",
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

    const newService = await Service.create({
      name: name.trim(),
      description: description.trim(),
      short_description: short_description?.trim(),
      category: category || "web_development",
      icon,
      features: features || [],
      pricing_type: pricing_type || "contact",
      starting_price,
      currency: currency || "USD",
      is_active: is_active !== undefined ? is_active : true,
      is_featured: is_featured !== undefined ? is_featured : false,
      display_order: display_order !== undefined ? display_order : 0,
      deliverables: deliverables || [],
      duration_estimate: duration_estimate?.trim(),
      created_by: request.user._id,
    });

    const populatedService = await Service.findById(newService._id).populate(
      "created_by",
      "first_name last_name email"
    );

    reply.status(201).send({
      success: true,
      message: "Service created successfully",
      data: populatedService,
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: "Failed to create service",
    });
  }
};

// PUT update service
export const updateService = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { id } = request.params as { id: string };
    const { 
      name,
      description,
      short_description,
      category,
      icon,
      features,
      pricing_type,
      starting_price,
      currency,
      is_active,
      is_featured,
      display_order,
      deliverables,
      duration_estimate
    } = request.body as {
      name?: string;
      description?: string;
      short_description?: string;
      category?: ServiceCategory;
      icon?: string;
      features?: string[];
      pricing_type?: PricingType;
      starting_price?: number;
      currency?: string;
      is_active?: boolean;
      is_featured?: boolean;
      display_order?: number;
      deliverables?: string[];
      duration_estimate?: string;
    };

    if (!Types.ObjectId.isValid(id)) {
      reply.status(400).send({
        success: false,
        error: "Invalid service ID",
      });
      return;
    }

    const existingService = await Service.findById(id);

    if (!existingService) {
      reply.status(404).send({
        success: false,
        error: "Service not found",
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
    if (name !== undefined) existingService.name = name.trim();
    if (description !== undefined) existingService.description = description.trim();
    if (short_description !== undefined) existingService.short_description = short_description.trim();
    if (category !== undefined) existingService.category = category;
    if (icon !== undefined) existingService.icon = icon;
    if (features !== undefined) existingService.features = features;
    if (pricing_type !== undefined) existingService.pricing_type = pricing_type;
    if (starting_price !== undefined) existingService.starting_price = starting_price;
    if (currency !== undefined) existingService.currency = currency;
    if (is_active !== undefined) existingService.is_active = is_active;
    if (is_featured !== undefined) existingService.is_featured = is_featured;
    if (display_order !== undefined) existingService.display_order = display_order;
    if (deliverables !== undefined) existingService.deliverables = deliverables;
    if (duration_estimate !== undefined) existingService.duration_estimate = duration_estimate.trim();

    await existingService.save();

    const updatedService = await Service.findById(id).populate(
      "created_by",
      "first_name last_name email"
    );

    reply.status(200).send({
      success: true,
      message: "Service updated successfully",
      data: updatedService,
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: "Failed to update service",
    });
  }
};

// DELETE service
export const deleteService = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { id } = request.params as { id: string };

    if (!Types.ObjectId.isValid(id)) {
      reply.status(400).send({
        success: false,
        error: "Invalid service ID",
      });
      return;
    }

    const service = await Service.findById(id);

    if (!service) {
      reply.status(404).send({
        success: false,
        error: "Service not found",
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

    await Service.findByIdAndDelete(id);

    reply.status(200).send({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: "Failed to delete service",
    });
  }
};