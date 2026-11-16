import { FastifyRequest, FastifyReply } from "fastify";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { sendOtpEmail } from "../../utils/email.service";
import { constant } from "../../config/constant";
import { User } from "../../models/user/user.model";
import { hashOtp, Otp } from "../../models/auth/otp.model";

/**
 * Admin Send OTP - Special route for admin login
 * Only users with the configured ADMIN_EMAIL can use this route
 */
export const adminSendOtp = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { email, password } = request.body as { email?: string; password?: string };

  if (!email || !password || typeof email !== "string" || typeof password !== "string") {
    reply.status(400).send({ success: false, error: "Email and password are required." });
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

  // Find user
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    reply.status(401).send({
      success: false,
      error: "Invalid credentials.",
    });
    return;
  }

  // Verify password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    reply.status(401).send({
      success: false,
      error: "Invalid credentials.",
    });
    return;
  }

  // Check account status
  if (user.account_status !== "active") {
    reply.status(403).send({
      success: false,
      error: `Account is ${user.account_status}. Please contact support.`,
    });
    return;
  }

  // Generate and send OTP
  await Otp.deleteMany({ email: email.toLowerCase(), purpose: "admin_login" });
  const otp = crypto.randomInt(100000, 999999).toString();
  const otpRecord = await Otp.create({
    email: email.toLowerCase(),
    otp: hashOtp(otp),
    expires_at: new Date(Date.now() + constant.OTP_EXPIRY_MINUTES * 60 * 1000),
    purpose: "admin_login",
  });

  try {
    await sendOtpEmail(email, otp);
  } catch {
    await Otp.deleteOne({ _id: otpRecord._id });
    reply.status(502).send({
      success: false,
      error: "Could not send OTP. Please try again.",
    });
    return;
  }

  reply.status(200).send({
    success: true,
    message: "OTP sent to your email for admin verification.",
  });
};
