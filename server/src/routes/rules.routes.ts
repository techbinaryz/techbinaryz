import { FastifyInstance } from "fastify";
import { createRule, deleteRule, getAllRules, getRuleById, updateRule } from "../modules/service/rules";

export default async function rulesRoutes(fastify: FastifyInstance) {
  // Public route - get all rules
  fastify.get("/rules", getAllRules);

  // Public route - get single rule
  fastify.get("/rules/:id", getRuleById);

  // Protected routes - require authentication
  fastify.post("/rules", { preHandler: [fastify.authenticate] }, createRule);

  fastify.put("/rules/:id", { preHandler: [fastify.authenticate] }, updateRule);

  fastify.delete(
    "/rules/:id",
    { preHandler: [fastify.authenticate] },
    deleteRule
  );
}
