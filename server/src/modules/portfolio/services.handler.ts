import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { ServiceSection } from "../../models/Portfolio";

export default async function servicesRoutes(fastify: FastifyInstance) {
  // Get all active services (public)
  fastify.get("/api/portfolio/services", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const services = await ServiceSection.find({ isActive: true }).sort({ order: 1 });
      return { success: true, data: services };
    } catch (error) {
      return reply.internalServerError("Failed to fetch services");
    }
  });

  // Get all services (admin)
  fastify.get(
    "/api/admin/portfolio/services",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const services = await ServiceSection.find().sort({ order: 1 });
        return { success: true, data: services };
      } catch (error) {
        return reply.internalServerError("Failed to fetch services");
      }
    }
  );

  // Get single service (admin)
  fastify.get(
    "/api/admin/portfolio/services/:id",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;
        const service = await ServiceSection.findById(id);
        if (!service) {
          return reply.notFound("Service not found");
        }
        return { success: true, data: service };
      } catch (error) {
        return reply.internalServerError("Failed to fetch service");
      }
    }
  );

  // Create service (admin)
  fastify.post(
    "/api/admin/portfolio/services",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const body = request.body as any;
        const service = new ServiceSection(body);
        await service.save();
        return reply.code(201).send({ success: true, data: service });
      } catch (error) {
        return reply.badRequest("Failed to create service");
      }
    }
  );

  // Update service (admin)
  fastify.put(
    "/api/admin/portfolio/services/:id",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;
        const body = request.body as any;
        const service = await ServiceSection.findByIdAndUpdate(id, body, { new: true });
        if (!service) {
          return reply.notFound("Service not found");
        }
        return { success: true, data: service };
      } catch (error) {
        return reply.badRequest("Failed to update service");
      }
    }
  );

  // Delete service (admin)
  fastify.delete(
    "/api/admin/portfolio/services/:id",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;
        const service = await ServiceSection.findByIdAndDelete(id);
        if (!service) {
          return reply.notFound("Service not found");
        }
        return { success: true, message: "Service deleted successfully" };
      } catch (error) {
        return reply.badRequest("Failed to delete service");
      }
    }
  );

  // Reorder services (admin)
  fastify.post(
    "/api/admin/portfolio/services/reorder",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { serviceIds } = request.body as { serviceIds: string[] };
        const updatePromises = serviceIds.map((id, index) =>
          ServiceSection.findByIdAndUpdate(id, { order: index })
        );
        await Promise.all(updatePromises);
        return { success: true, message: "Services reordered successfully" };
      } catch (error) {
        return reply.badRequest("Failed to reorder services");
      }
    }
  );
}
