import { FastifyRequest, FastifyReply } from "fastify";
import { Types } from "mongoose";
import { User } from "../../models/user.model";
import { verifyAndConsumeOtp } from "../../models/otp.model";
import { signAccess, issueRefreshToken } from "./auth.internal";

export const loginVerify = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { email, otp } = request.body as { email?: string; otp?: string };

  if (!email || !otp) {
    reply.status(400).send({ success: false, error: "Email and OTP are required." });
    return;
  }

  // Verify and consume OTP
  const { ok } = await verifyAndConsumeOtp(email, otp, "login");
  if (!ok) {
    reply.status(400).send({
      success: false,
      error: "Invalid or expired OTP. Please try again.",
    });
    return;
  }

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    reply.status(404).send({ success: false, error: "User not found." });
    return;
  }

  // Generate tokens
  const accessToken = signAccess(user._id as Types.ObjectId);
  const refreshToken = await issueRefreshToken(user._id as Types.ObjectId);

  reply.status(200).send({
    success: true,
    message: "Login successful.",
    access_token: accessToken,
    refresh_token: refreshToken,
    user: {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    },
  });
};
