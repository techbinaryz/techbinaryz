import "dotenv/config";
import { buildApp } from "./app";
import { env } from "./config/env";

const start = async () => {
  try {
    const fastify = await buildApp();

    await fastify.listen({
      port: parseInt(env.PORT),
      host: "0.0.0.0",
    });

    console.log(`🚀 Server running on http://localhost:${env.PORT}`);
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

start();
