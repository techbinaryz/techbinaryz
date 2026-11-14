import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { AboutSection, TeamMember, StatSection } from "../../models/Portfolio";

export default async function aboutRoutes(fastify: FastifyInstance) {
  // ============= ABOUT SECTION =============
  
  // Get active about section (public)
  fastify.get("/api/portfolio/about", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const about = await AboutSection.findOne({ isActive: true }).sort({ updatedAt: -1 });
      if (!about) {
        return reply.notFound("About section not found");
      }
      return { success: true, data: about };
    } catch (error) {
      return reply.internalServerError("Failed to fetch about section");
    }
  });

  // Get all about sections (admin)
  fastify.get(
    "/api/admin/portfolio/about",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const abouts = await AboutSection.find().sort({ updatedAt: -1 });
        return { success: true, data: abouts };
      } catch (error) {
        return reply.internalServerError("Failed to fetch about sections");
      }
    }
  );

  // Create about section (admin)
  fastify.post(
    "/api/admin/portfolio/about",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const body = request.body as any;
        const about = new AboutSection(body);
        await about.save();
        return reply.code(201).send({ success: true, data: about });
      } catch (error) {
        return reply.badRequest("Failed to create about section");
      }
    }
  );

  // Update about section (admin)
  fastify.put(
    "/api/admin/portfolio/about/:id",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;
        const body = request.body as any;
        const about = await AboutSection.findByIdAndUpdate(id, body, { new: true });
        if (!about) {
          return reply.notFound("About section not found");
        }
        return { success: true, data: about };
      } catch (error) {
        return reply.badRequest("Failed to update about section");
      }
    }
  );

  // Delete about section (admin)
  fastify.delete(
    "/api/admin/portfolio/about/:id",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;
        const about = await AboutSection.findByIdAndDelete(id);
        if (!about) {
          return reply.notFound("About section not found");
        }
        return { success: true, message: "About section deleted successfully" };
      } catch (error) {
        return reply.badRequest("Failed to delete about section");
      }
    }
  );

  // ============= TEAM MEMBERS =============
  
  // Get all active team members (public)
  fastify.get("/api/portfolio/team", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const team = await TeamMember.find({ isActive: true }).sort({ order: 1 });
      return { success: true, data: team };
    } catch (error) {
      return reply.internalServerError("Failed to fetch team members");
    }
  });

  // Get all team members (admin)
  fastify.get(
    "/api/admin/portfolio/team",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const team = await TeamMember.find().sort({ order: 1 });
        return { success: true, data: team };
      } catch (error) {
        return reply.internalServerError("Failed to fetch team members");
      }
    }
  );

  // Create team member (admin)
  fastify.post(
    "/api/admin/portfolio/team",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const body = request.body as any;
        const member = new TeamMember(body);
        await member.save();
        return reply.code(201).send({ success: true, data: member });
      } catch (error) {
        return reply.badRequest("Failed to create team member");
      }
    }
  );

  // Update team member (admin)
  fastify.put(
    "/api/admin/portfolio/team/:id",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;
        const body = request.body as any;
        const member = await TeamMember.findByIdAndUpdate(id, body, { new: true });
        if (!member) {
          return reply.notFound("Team member not found");
        }
        return { success: true, data: member };
      } catch (error) {
        return reply.badRequest("Failed to update team member");
      }
    }
  );

  // Delete team member (admin)
  fastify.delete(
    "/api/admin/portfolio/team/:id",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;
        const member = await TeamMember.findByIdAndDelete(id);
        if (!member) {
          return reply.notFound("Team member not found");
        }
        return { success: true, message: "Team member deleted successfully" };
      } catch (error) {
        return reply.badRequest("Failed to delete team member");
      }
    }
  );

  // ============= STATISTICS =============
  
  // Get all active stats (public)
  fastify.get("/api/portfolio/stats", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const stats = await StatSection.find({ isActive: true }).sort({ order: 1 });
      return { success: true, data: stats };
    } catch (error) {
      return reply.internalServerError("Failed to fetch stats");
    }
  });

  // Get all stats (admin)
  fastify.get(
    "/api/admin/portfolio/stats",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const stats = await StatSection.find().sort({ order: 1 });
        return { success: true, data: stats };
      } catch (error) {
        return reply.internalServerError("Failed to fetch stats");
      }
    }
  );

  // Create stat (admin)
  fastify.post(
    "/api/admin/portfolio/stats",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const body = request.body as any;
        const stat = new StatSection(body);
        await stat.save();
        return reply.code(201).send({ success: true, data: stat });
      } catch (error) {
        return reply.badRequest("Failed to create stat");
      }
    }
  );

  // Update stat (admin)
  fastify.put(
    "/api/admin/portfolio/stats/:id",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;
        const body = request.body as any;
        const stat = await StatSection.findByIdAndUpdate(id, body, { new: true });
        if (!stat) {
          return reply.notFound("Stat not found");
        }
        return { success: true, data: stat };
      } catch (error) {
        return reply.badRequest("Failed to update stat");
      }
    }
  );

  // Delete stat (admin)
  fastify.delete(
    "/api/admin/portfolio/stats/:id",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;
        const stat = await StatSection.findByIdAndDelete(id);
        if (!stat) {
          return reply.notFound("Stat not found");
        }
        return { success: true, message: "Stat deleted successfully" };
      } catch (error) {
        return reply.badRequest("Failed to delete stat");
      }
    }
  );
}
