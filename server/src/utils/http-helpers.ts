import { FastifyRequest } from "fastify";

/**
 * Extract client IP from request, considering proxy headers
 */
export const getClientIp = (request: FastifyRequest): string => {
  const forwarded = request.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0]!.trim();
  }
  return request.ip || "unknown";
};

/**
 * Parse user agent from request
 */
export const parseUserAgent = (request: FastifyRequest): string => {
  return request.headers["user-agent"] || "unknown";
};
