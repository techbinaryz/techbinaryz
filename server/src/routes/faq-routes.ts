import { FastifyInstance } from "fastify";
import { createFaq, deleteFaq, getAllFaqs, getFaqById, updateFaq } from "../modules/user/faq";

export default async function faqRoutes(fastify: FastifyInstance) {
  // Public route - get all FAQs
  fastify.get("/faqs", getAllFaqs);

  // Public route - get single FAQ
  fastify.get("/faqs/:id", getFaqById);

  // Protected routes - require authentication
  fastify.post("/faqs", { preHandler: [fastify.authenticate] }, createFaq);

  fastify.put("/faqs/:id", { preHandler: [fastify.authenticate] }, updateFaq);

  fastify.delete(
    "/faqs/:id",
    { preHandler: [fastify.authenticate] },
    deleteFaq
  );
}
