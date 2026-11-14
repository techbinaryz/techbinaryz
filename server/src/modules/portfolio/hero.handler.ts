import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { HeroSection } from "../../models/Portfolio";

export default async function heroRoutes(fastify: FastifyInstance) {
  // Get active hero section
  fastify.get("/api/portfolio/hero", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const hero = await HeroSection.findOne({ isActive: true }).sort({ updatedAt: -1 });
      if (!hero) {
        return reply.notFound("Hero section not found");
      }
      return { success: true, data: hero };
    } catch (error) {
      return reply.internalServerError("Failed to fetch hero section");
    }
  });

  // Get all hero sections (admin)
  fastify.get(
    "/api/admin/portfolio/hero",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const heroes = await HeroSection.find().sort({ updatedAt: -1 });
        return { success: true, data: heroes };
      } catch (error) {
        return reply.internalServerError("Failed to fetch hero sections");
      }
    }
  );

  // Create hero section (admin)
  fastify.post(
    "/api/admin/portfolio/hero",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const body = request.body as any;
        const hero = new HeroSection(body);
        await hero.save();
        return reply.code(201).send({ success: true, data: hero });
      } catch (error) {
        return reply.badRequest("Failed to create hero section");
      }
    }
  );

  // Update hero section (admin)
  fastify.put(
    "/api/admin/portfolio/hero/:id",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;
        const body = request.body as any;
        const hero = await HeroSection.findByIdAndUpdate(id, body, { new: true });
        if (!hero) {
          return reply.notFound("Hero section not found");
        }
        return { success: true, data: hero };
      } catch (error) {
        return reply.badRequest("Failed to update hero section");
      }
    }
  );

  // Delete hero section (admin)
  fastify.delete(
    "/api/admin/portfolio/hero/:id",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;
        const hero = await HeroSection.findByIdAndDelete(id);
        if (!hero) {
          return reply.notFound("Hero section not found");
        }
        return { success: true, message: "Hero section deleted successfully" };
      } catch (error) {
        return reply.badRequest("Failed to delete hero section");
      }
    }
  );

  // Toggle active status (admin)
  fastify.patch(
    "/api/admin/portfolio/hero/:id/toggle",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;
        const hero = await HeroSection.findById(id);
        if (!hero) {
          return reply.notFound("Hero section not found");
        }
        hero.isActive = !hero.isActive;
        await hero.save();
        return { success: true, data: hero };
      } catch (error) {
        return reply.badRequest("Failed to toggle hero section");
      }
    }
  );
}
