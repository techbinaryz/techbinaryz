// Projects created till now to be listed in here

import { FastifyRequest, FastifyReply } from "fastify";
import { Project, ProjectStatus, ProjectCategory } from "../../models/service/projects.model";
import { Types } from "mongoose";

// GET all projects
export const getAllProjects = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { limit = 10, page = 1, is_published, is_featured, status, category } = request.query as { 
      limit?: number; 
      page?: number;
      is_published?: string;
      is_featured?: string;
      status?: ProjectStatus;
      category?: ProjectCategory;
    };

    const skip = (Number(page) - 1) * Number(limit);

    // Build filter
    const filter: any = {};
    if (is_published !== undefined) {
      filter.is_published = is_published === "true";
    }
    if (is_featured !== undefined) {
      filter.is_featured = is_featured === "true";
    }
    if (status) {
      filter.status = status;
    }
    if (category) {
      filter.category = category;
    }

    const projects = await Project.find(filter)
      .populate("created_by", "first_name last_name email")
      .sort({ is_featured: -1, display_order: 1, created_at: -1 })
      .limit(Number(limit))
      .skip(skip);

    const total = await Project.countDocuments(filter);

    reply.status(200).send({
      success: true,
      data: projects,
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
      error: "Failed to fetch projects",
    });
  }
};

// GET single project by ID
export const getProjectById = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { id } = request.params as { id: string };

    if (!Types.ObjectId.isValid(id)) {
      reply.status(400).send({
        success: false,
        error: "Invalid project ID",
      });
      return;
    }

    const project = await Project.findById(id).populate(
      "created_by",
      "first_name last_name email"
    );

    if (!project) {
      reply.status(404).send({
        success: false,
        error: "Project not found",
      });
      return;
    }

    reply.status(200).send({
      success: true,
      data: project,
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: "Failed to fetch project",
    });
  }
};

// POST create new project
export const createProject = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { 
      title,
      description,
      short_description,
      category,
      status,
      technologies,
      image,
      gallery,
      github_url,
      live_url,
      start_date,
      end_date,
      client_name,
      team_size,
      is_featured,
      is_published,
      display_order
    } = request.body as {
      title?: string;
      description?: string;
      short_description?: string;
      category?: ProjectCategory;
      status?: ProjectStatus;
      technologies?: string[];
      image?: string;
      gallery?: string[];
      github_url?: string;
      live_url?: string;
      start_date?: Date;
      end_date?: Date;
      client_name?: string;
      team_size?: number;
      is_featured?: boolean;
      is_published?: boolean;
      display_order?: number;
    };

    // Validation
    if (!title || !title.trim()) {
      reply.status(400).send({
        success: false,
        error: "Project title is required",
      });
      return;
    }

    if (!description || !description.trim()) {
      reply.status(400).send({
        success: false,
        error: "Project description is required",
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

    const newProject = await Project.create({
      title: title.trim(),
      description: description.trim(),
      short_description: short_description?.trim(),
      category: category || "web",
      status: status || "planning",
      technologies: technologies || [],
      image,
      gallery: gallery || [],
      github_url: github_url?.trim(),
      live_url: live_url?.trim(),
      start_date,
      end_date,
      client_name: client_name?.trim(),
      team_size,
      is_featured: is_featured !== undefined ? is_featured : false,
      is_published: is_published !== undefined ? is_published : false,
      display_order: display_order !== undefined ? display_order : 0,
      created_by: request.user._id,
    });

    const populatedProject = await Project.findById(newProject._id).populate(
      "created_by",
      "first_name last_name email"
    );

    reply.status(201).send({
      success: true,
      message: "Project created successfully",
      data: populatedProject,
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: "Failed to create project",
    });
  }
};

// PUT update project
export const updateProject = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { id } = request.params as { id: string };
    const { 
      title,
      description,
      short_description,
      category,
      status,
      technologies,
      image,
      gallery,
      github_url,
      live_url,
      start_date,
      end_date,
      client_name,
      team_size,
      is_featured,
      is_published,
      display_order
    } = request.body as {
      title?: string;
      description?: string;
      short_description?: string;
      category?: ProjectCategory;
      status?: ProjectStatus;
      technologies?: string[];
      image?: string;
      gallery?: string[];
      github_url?: string;
      live_url?: string;
      start_date?: Date;
      end_date?: Date;
      client_name?: string;
      team_size?: number;
      is_featured?: boolean;
      is_published?: boolean;
      display_order?: number;
    };

    if (!Types.ObjectId.isValid(id)) {
      reply.status(400).send({
        success: false,
        error: "Invalid project ID",
      });
      return;
    }

    const existingProject = await Project.findById(id);

    if (!existingProject) {
      reply.status(404).send({
        success: false,
        error: "Project not found",
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
    if (title !== undefined) existingProject.title = title.trim();
    if (description !== undefined) existingProject.description = description.trim();
    if (short_description !== undefined) existingProject.short_description = short_description.trim();
    if (category !== undefined) existingProject.category = category;
    if (status !== undefined) existingProject.status = status;
    if (technologies !== undefined) existingProject.technologies = technologies;
    if (image !== undefined) existingProject.image = image;
    if (gallery !== undefined) existingProject.gallery = gallery;
    if (github_url !== undefined) existingProject.github_url = github_url.trim();
    if (live_url !== undefined) existingProject.live_url = live_url.trim();
    if (start_date !== undefined) existingProject.start_date = start_date;
    if (end_date !== undefined) existingProject.end_date = end_date;
    if (client_name !== undefined) existingProject.client_name = client_name.trim();
    if (team_size !== undefined) existingProject.team_size = team_size;
    if (is_featured !== undefined) existingProject.is_featured = is_featured;
    if (is_published !== undefined) existingProject.is_published = is_published;
    if (display_order !== undefined) existingProject.display_order = display_order;

    await existingProject.save();

    const updatedProject = await Project.findById(id).populate(
      "created_by",
      "first_name last_name email"
    );

    reply.status(200).send({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: "Failed to update project",
    });
  }
};

// DELETE project
export const deleteProject = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { id } = request.params as { id: string };

    if (!Types.ObjectId.isValid(id)) {
      reply.status(400).send({
        success: false,
        error: "Invalid project ID",
      });
      return;
    }

    const project = await Project.findById(id);

    if (!project) {
      reply.status(404).send({
        success: false,
        error: "Project not found",
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

    await Project.findByIdAndDelete(id);

    reply.status(200).send({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      error: "Failed to delete project",
    });
  }
}; 