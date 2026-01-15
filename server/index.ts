import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

// Welcome route
fastify.get("/", async (request, reply) => {
  return {
    message: "Welcome to Tech Binaryz API!",
    status: "Server is running",
    timestamp: new Date().toISOString(),
  };
});

// Health check route
fastify.get("/health", async (request, reply) => {
  return {
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
});

// Start server
const start = async () => {
  try {
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
    await fastify.listen({ port, host: "0.0.0.0" });
    console.log(`🚀 Server running on http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
