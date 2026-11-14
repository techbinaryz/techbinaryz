import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { ProjectSection } from "../../models/Portfolio";

export default async function projectsRoutes(fastify: FastifyInstance) {
  // Get all active projects (public)
  fastify.get("/api/portfolio/projects", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { category, featured } = request.query as { category?: string; featured?: string };
      const filter: any = { isActive: true };
      
      if (category) filter.category = category;
      if (featured === "true") filter.featured = true;
      
      const projects = await ProjectSection.find(filter).sort({ order: 1, createdAt: -1 });
      return { success: true, data: projects };
    } catch (error) {
      return reply.internalServerError("Failed to fetch projects");
    }
  });

  // Get single project (public)
  fastify.get(
    "/api/portfolio/projects/:id",
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;
        const project = await ProjectSection.findOne({ _id: id, isActive: true });
        if (!project) {
          return reply.notFound("Project not found");
        }
        return { success: true, data: project };
      } catch (error) {
        return reply.internalServerError("Failed to fetch project");
      }
    }
  );

  // Get all projects (admin)
  fastify.get(
    "/api/admin/portfolio/projects",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const projects = await ProjectSection.find().sort({ order: 1, createdAt: -1 });
        return { success: true, data: projects };
      } catch (error) {
        return reply.internalServerError("Failed to fetch projects");
      }
    }
  );

  // Create project (admin)
  fastify.post(
    "/api/admin/portfolio/projects",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const body = request.body as any;
        const project = new ProjectSection(body);
        await project.save();
        return reply.code(201).send({ success: true, data: project });
      } catch (error) {
        return reply.badRequest("Failed to create project");
      }
    }
  );

  // Update project (admin)
  fastify.put(
    "/api/admin/portfolio/projects/:id",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;
        const body = request.body as any;
        const project = await ProjectSection.findByIdAndUpdate(id, body, { new: true });
        if (!project) {
          return reply.notFound("Project not found");
        }
        return { success: true, data: project };
      } catch (error) {
        return reply.badRequest("Failed to update project");
      }
    }
  );

  // Delete project (admin)
  fastify.delete(
    "/api/admin/portfolio/projects/:id",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;
        const project = await ProjectSection.findByIdAndDelete(id);
        if (!project) {
          return reply.notFound("Project not found");
        }
        return { success: true, message: "Project deleted successfully" };
      } catch (error) {
        return reply.badRequest("Failed to delete project");
      }
    }
  );

  // Toggle featured status (admin)
  fastify.patch(
    "/api/admin/portfolio/projects/:id/featured",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;
        const project = await ProjectSection.findById(id);
        if (!project) {
          return reply.notFound("Project not found");
        }
        project.featured = !project.featured;
        await project.save();
        return { success: true, data: project };
      } catch (error) {
        return reply.badRequest("Failed to toggle featured status");
      }
    }
  );
}
