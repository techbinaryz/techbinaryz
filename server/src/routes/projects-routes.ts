import { FastifyInstance } from "fastify";
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from "../modules/service/projects";

export default async function projectsRoutes(fastify: FastifyInstance) {
  // Public route - get all projects
  fastify.get("/projects", getAllProjects);

  // Public route - get single project
  fastify.get("/projects/:id", getProjectById);

  // Protected routes - require authentication
  fastify.post("/projects", { preHandler: [fastify.authenticate] }, createProject);

  fastify.put("/projects/:id", { preHandler: [fastify.authenticate] }, updateProject);

  fastify.delete(
    "/projects/:id",
    { preHandler: [fastify.authenticate] },
    deleteProject
  );
}
