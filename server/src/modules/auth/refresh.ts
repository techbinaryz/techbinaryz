import { FastifyRequest, FastifyReply } from "fastify";
import { Types } from "mongoose";
import { RefreshToken } from "../../models/refresh-token.model";
import { User } from "../../models/user.model";
import { signAccess, issueRefreshToken } from "./auth.internal";

export const refresh = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const { refresh_token } = request.body as { refresh_token?: string };

  if (!refresh_token) {
    reply.status(400).send({ success: false, error: "Refresh token is required." });
    return;
  }

  // Find the refresh token
  const tokenDoc = await RefreshToken.findOne({
    token: refresh_token,
    is_revoked: false,
    expires_at: { $gt: new Date() },
  });

  if (!tokenDoc) {
    reply.status(401).send({ success: false, error: "Invalid or expired refresh token." });
    return;
  }

  // Check if user still exists and is active
  const user = await User.findById(tokenDoc.user_id);
  if (!user || user.account_status !== "active") {
    reply.status(401).send({ success: false, error: "User account is not active." });
    return;
  }

  // Revoke old token
  await RefreshToken.updateOne(
    { _id: tokenDoc._id },
    { $set: { is_revoked: true, revoked_at: new Date() } }
  );

  // Issue new tokens
  const accessToken = signAccess(tokenDoc.user_id as Types.ObjectId);
  const newRefreshToken = await issueRefreshToken(
    tokenDoc.user_id as Types.ObjectId,
    tokenDoc.family_id
  );

  // Update replaced_by field
  await RefreshToken.updateOne({ _id: tokenDoc._id }, { $set: { replaced_by: newRefreshToken } });

  reply.status(200).send({
    success: true,
    access_token: accessToken,
    refresh_token: newRefreshToken,
  });
};
