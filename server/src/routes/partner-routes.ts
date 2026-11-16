import { FastifyInstance } from "fastify";
import { createPartner, deletePartner, getAllPartners, getPartnerById, updatePartner } from "../modules/user/partners";

export default async function partnerRoutes(fastify: FastifyInstance) {
  // Public route - get all partners
  fastify.get("/partners", getAllPartners);

  // Public route - get single partner
  fastify.get("/partners/:id", getPartnerById);

  // Protected routes - require authentication
  fastify.post("/partners", { preHandler: [fastify.authenticate] }, createPartner);

  fastify.put("/partners/:id", { preHandler: [fastify.authenticate] }, updatePartner);

  fastify.delete(
    "/partners/:id",
    { preHandler: [fastify.authenticate] },
    deletePartner
  );
}
