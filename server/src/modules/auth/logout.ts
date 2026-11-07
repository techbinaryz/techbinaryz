import { FastifyRequest, FastifyReply } from "fastify";
import { RefreshToken } from "../../models/refresh-token.model";

export const logout = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const { refresh_token } = request.body as { refresh_token?: string };

  if (!refresh_token) {
    reply.status(400).send({ success: false, error: "Refresh token is required." });
    return;
  }

  // Revoke the refresh token
  const result = await RefreshToken.updateOne(
    { token: refresh_token },
    { $set: { is_revoked: true, revoked_at: new Date() } }
  );

  if (result.modifiedCount === 0) {
    reply.status(404).send({ success: false, error: "Refresh token not found." });
    return;
  }

  reply.status(200).send({
    success: true,
    message: "Logged out successfully.",
  });
};
