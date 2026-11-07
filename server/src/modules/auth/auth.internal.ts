import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Types } from "mongoose";
import { env } from "../../config/env";
import { RefreshToken } from "../../models/refresh-token.model";

export { getClientIp, parseUserAgent } from "../../utils/http-helpers";

export const SALT_ROUNDS = env.SALT_ROUNDS;

/**
 * Sign access token
 */
export const signAccess = (userId: Types.ObjectId): string => {
  return jwt.sign(
    { id: userId, role: "admin" },
    env.JWT_SECRET,
    { expiresIn: env.ACCESS_TOKEN_EXPIRY } as jwt.SignOptions
  );
};

/**
 * Issue refresh token
 */
export const issueRefreshToken = async (
  userId: Types.ObjectId,
  familyId?: string
): Promise<string> => {
  const token = crypto.randomBytes(64).toString("hex");
  const expiresMs = env.REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

  await RefreshToken.create({
    token,
    user_id: userId,
    family_id: familyId || crypto.randomBytes(16).toString("hex"),
    expires_at: new Date(Date.now() + expiresMs),
  });

  return token;
};

/**
 * Verify access token
 */
export const verifyAccessToken = (token: string): { id: string; role: string } | null => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string; role: string };
    return decoded;
  } catch {
    return null;
  }
};
