import { FastifyInstance } from "fastify";
import { createFeedback, deleteFeedback, getAllFeedbacks, getFeedbackById, updateFeedback } from "../modules/user/feedback";

export default async function feedbackRoutes(fastify: FastifyInstance) {
  // Public route - get all feedbacks
  fastify.get("/feedbacks", getAllFeedbacks);

  // Public route - get single feedback
  fastify.get("/feedbacks/:id", getFeedbackById);

  // Protected routes - require authentication
  fastify.post("/feedbacks", { preHandler: [fastify.authenticate] }, createFeedback);

  fastify.put("/feedbacks/:id", { preHandler: [fastify.authenticate] }, updateFeedback);

  fastify.delete(
    "/feedbacks/:id",
    { preHandler: [fastify.authenticate] },
    deleteFeedback
  );
}