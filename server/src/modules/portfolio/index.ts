import { FastifyInstance } from "fastify";
import heroRoutes from "./hero.handler";
import servicesRoutes from "./services.handler";
import projectsRoutes from "./projects.handler";
import testimonialsRoutes from "./testimonials.handler";
import aboutRoutes from "./about.handler";
import contactRoutes from "./contact.handler";

export default async function portfolioRoutes(fastify: FastifyInstance) {
  // Register all portfolio route modules
  await fastify.register(heroRoutes);
  await fastify.register(servicesRoutes);
  await fastify.register(projectsRoutes);
  await fastify.register(testimonialsRoutes);
  await fastify.register(aboutRoutes);
  await fastify.register(contactRoutes);
}
