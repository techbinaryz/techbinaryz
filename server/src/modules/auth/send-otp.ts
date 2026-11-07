import { FastifyRequest, FastifyReply } from "fastify";
import crypto from "crypto";
import { Otp, hashOtp } from "../../models/otp.model";
import { sendOtpEmail } from "../../utils/email.service";
import { env } from "../../config/env";

export const sendOtp = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const { email } = request.body as { email?: string };

  if (!email || typeof email !== "string") {
    reply.status(400).send({ success: false, error: "Email is required." });
    return;
  }

  // Delete any existing OTPs for this email (register purpose)
  await Otp.deleteMany({ email, purpose: "register" });

  // Generate 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString();

  // Create OTP record with hashed OTP
  const otpRecord = await Otp.create({
    email,
    otp: hashOtp(otp),
    expires_at: new Date(Date.now() + env.OTP_EXPIRY_MINUTES * 60 * 1000),
    purpose: "register",
  });

  // Send OTP email
  try {
    await sendOtpEmail(email, otp);
  } catch (error) {
    // If email fails, delete the OTP record
    await Otp.deleteOne({ _id: otpRecord._id });
    reply.status(502).send({
      success: false,
      error: "Failed to send OTP email. Please try again.",
    });
    return;
  }

  reply.status(200).send({
    success: true,
    message: "OTP sent to your email.",
  });
};
