import fp from "fastify-plugin";
import { FastifyReply, FastifyRequest } from "fastify";
import { User, IUser } from "../models/user.model";
import { verifyAccessToken } from "../modules/auth/auth.internal";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
  interface FastifyRequest {
    user?: IUser;
  }
}

export default fp(async function authenticatePlugin(fastify) {
  fastify.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const authHeader = request.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        reply.status(401).send({
          success: false,
          error: "Authorization header missing or invalid",
        });
        return;
      }

      const token = authHeader.substring(7);
      const decoded = verifyAccessToken(token);

      if (!decoded) {
        reply.status(401).send({
          success: false,
          error: "Invalid or expired token",
        });
        return;
      }

      // Load user from database
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        reply.status(401).send({
          success: false,
          error: "User not found",
        });
        return;
      }

      if (user.account_status !== "active") {
        reply.status(403).send({
          success: false,
          error: `Account is ${user.account_status}`,
        });
        return;
      }

      // Attach user to request
      request.user = user;
    } catch (error) {
      reply.status(401).send({
        success: false,
        error: "Authentication failed",
      });
    }
  });
});
