import { FastifyInstance } from "fastify";
import { createService, deleteService, getAllServices, getServiceById, updateService } from "../modules/service/services";

export default async function servicesRoutes(fastify: FastifyInstance) {
  // Public route - get all services
  fastify.get("/services", getAllServices);

  // Public route - get single service
  fastify.get("/services/:id", getServiceById);

  // Protected routes - require authentication
  fastify.post("/services", { preHandler: [fastify.authenticate] }, createService);

  fastify.put("/services/:id", { preHandler: [fastify.authenticate] }, updateService);

  fastify.delete(
    "/services/:id",
    { preHandler: [fastify.authenticate] },
    deleteService
  );
}
