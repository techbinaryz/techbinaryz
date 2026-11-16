import "dotenv/config";
import { buildApp } from "./app";
import { constant } from "./config/constant";

const start = async () => {
  try {
    const fastify = await buildApp();

    await fastify.listen({
      port: parseInt(constant.PORT),
      host: "0.0.0.0",
    });

    console.log(`🚀 Server running on http://localhost:${constant.PORT}`);
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

start();
