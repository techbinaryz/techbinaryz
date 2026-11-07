import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import sensible from "@fastify/sensible";
import rateLimit from "@fastify/rate-limit";
import { connectDatabase } from "./config/database";
import authenticatePlugin from "./plugins/authenticate";
import authRoutes from "./modules/auth/auth.handler";

export async function buildApp() {
  const fastify = Fastify({
    logger: {
      transport: {
        target: "pino-pretty",
        options: {
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname",
        },
      },
    },
  });

  // Register plugins
  await fastify.register(cors, {
    origin: true,
    credentials: true,
  });

  await fastify.register(helmet, {
    contentSecurityPolicy: false,
  });

  await fastify.register(sensible);

  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: "1 minute",
  });

  // Register custom plugins
  await fastify.register(authenticatePlugin);

  // Connect to database
  await connectDatabase();

  // Register routes
  await fastify.register(authRoutes);

  // Health check route
  fastify.get("/health", async () => {
    return { status: "ok", timestamp: new Date().toISOString() };
  });

  // Protected route example
  fastify.get(
    "/me",
    {
      preHandler: fastify.authenticate,
    },
    async (request) => {
      return {
        success: true,
        user: {
          id: request.user!._id,
          first_name: request.user!.first_name,
          last_name: request.user!.last_name,
          email: request.user!.email,
          role: request.user!.role,
        },
      };
    }
  );

  return fastify;
}
