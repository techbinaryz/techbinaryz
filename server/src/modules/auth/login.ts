import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { User } from "../../models/user.model";
import { Otp, hashOtp } from "../../models/otp.model";
import { BlockedIp } from "../../models/blocked-ip.model";
import { FailedLoginAttempt } from "../../models/failed-login-attempt.model";
import { sendOtpEmail } from "../../utils/email.service";
import { getClientIp } from "./auth.internal";
import { env } from "../../config/env";

export const login = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const { email, password } = request.body as { email?: string; password?: string };

  if (!email || !password || typeof email !== "string" || typeof password !== "string") {
    reply.status(400).send({ success: false, error: "Email and password are required." });
    return;
  }

  const ip = getClientIp(request);

  // Check if IP is blocked
  const blocked = await BlockedIp.findOne({ ip, email, blocked_until: { $gt: new Date() } });
  if (blocked) {
    reply.status(403).send({
      success: false,
      error: "Too many failed attempts. Please try again later.",
    });
    return;
  }

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    await trackFailedAttempt(ip, email);
    reply.status(401).send({ success: false, error: "Invalid email or password." });
    return;
  }

  // Verify password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    await trackFailedAttempt(ip, email);
    reply.status(401).send({ success: false, error: "Invalid email or password." });
    return;
  }

  // Check account status
  if (user.account_status !== "active") {
    reply.status(403).send({
      success: false,
      error: `Your account is ${user.account_status}. Please contact support.`,
    });
    return;
  }

  // Credentials valid → send OTP for 2FA
  await Otp.deleteMany({ email, purpose: "login" });
  const otp = crypto.randomInt(100000, 999999).toString();
  const otpRecord = await Otp.create({
    email,
    otp: hashOtp(otp),
    expires_at: new Date(Date.now() + env.OTP_EXPIRY_MINUTES * 60 * 1000),
    purpose: "login",
  });

  // Send OTP email
  try {
    await sendOtpEmail(email, otp);
  } catch {
    await Otp.deleteOne({ _id: otpRecord._id });
    reply.status(502).send({
      success: false,
      error: "We could not send your verification code. Please try again shortly.",
    });
    return;
  }

  // Clear failed attempts on successful credential validation
  await FailedLoginAttempt.deleteMany({ ip, email });

  reply.status(200).send({
    success: true,
    message: "Credentials verified. OTP sent to your email.",
    requires_otp: true,
  });
};

/**
 * Track failed login attempts and block attacker IP
 */
async function trackFailedAttempt(ip: string, email: string): Promise<void> {
  await FailedLoginAttempt.create({ ip, email });

  const recentCount = await FailedLoginAttempt.countDocuments({
    ip,
    email,
    created_at: { $gt: new Date(Date.now() - 15 * 60 * 1000) },
  });

  // Block IP after 5 failed attempts for 15 minutes
  if (recentCount >= 5) {
    await BlockedIp.findOneAndUpdate(
      { ip, email },
      { ip, email, blocked_until: new Date(Date.now() + 15 * 60 * 1000) },
      { upsert: true }
    );
  }

  // Block IP after 10 failed attempts for 1 hour
  if (recentCount >= 10) {
    await BlockedIp.findOneAndUpdate(
      { ip, email },
      { ip, email, blocked_until: new Date(Date.now() + 60 * 60 * 1000) },
      { upsert: true }
    );
  }
}
