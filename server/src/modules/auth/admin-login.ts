import { FastifyRequest, FastifyReply } from "fastify";
import { User } from "../../models/user.model";
import { Otp, verifyOtp } from "../../models/otp.model";
import { signAccess, issueRefreshToken } from "./auth.internal";
import { constant } from "../../config/constant";

/**
 * Admin Login - Verify OTP and issue tokens
 * Only for configured admin email
 */
export const adminLogin = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { email, otp } = request.body as { email?: string; otp?: string };

  if (!email || !otp || typeof email !== "string" || typeof otp !== "string") {
    reply.status(400).send({ success: false, error: "Email and OTP are required." });
    return;
  }

  // Check if this email is the configured admin email
  if (email.toLowerCase() !== constant.ADMIN_EMAIL.toLowerCase()) {
    reply.status(403).send({
      success: false,
      error: "This email is not authorized as admin.",
    });
    return;
  }

  // Verify OTP
  const otpValid = await verifyOtp(email.toLowerCase(), otp, "admin_login");
  if (!otpValid) {
    reply.status(400).send({
      success: false,
      error: "Invalid or expired OTP. Please request a new one.",
    });
    return;
  }

  // Delete used OTP
  await Otp.deleteMany({ email: email.toLowerCase(), purpose: "admin_login" });

  // Find user
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    reply.status(401).send({
      success: false,
      error: "User not found.",
    });
    return;
  }

  // Check account status
  if (user.account_status !== "active") {
    reply.status(403).send({
      success: false,
      error: `Account is ${user.account_status}.`,
    });
    return;
  }

  // Generate tokens
  const accessToken = signAccess(user._id);
  const refreshToken = await issueRefreshToken(user._id);

  reply.status(200).send({
    success: true,
    message: "Admin logged in successfully.",
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
