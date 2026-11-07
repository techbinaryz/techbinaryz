import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcrypt";
import { User } from "../../models/user.model";
import { verifyAndConsumeOtp } from "../../models/otp.model";
import { sendWelcomeEmail } from "../../utils/email.service";
import { signAccess, issueRefreshToken, SALT_ROUNDS } from "./auth.internal";
import { Types } from "mongoose";

export const register = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const { full_name, email, password, otp } = request.body as {
    full_name?: string;
    email?: string;
    password?: string;
    otp?: string;
  };

  // Validation
  if (!full_name || !email || !password || !otp) {
    reply.status(400).send({
      success: false,
      error: "Full name, email, password, and OTP are required.",
    });
    return;
  }

  // Parse name
  const [first_name, ...rest] = full_name.trim().split(/\s+/);
  const last_name = rest.join(" ") || "";

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    reply.status(409).send({ success: false, error: "This email is already registered." });
    return;
  }

  // Verify and consume OTP
  const { ok } = await verifyAndConsumeOtp(email, otp, "register");
  if (!ok) {
    reply.status(400).send({
      success: false,
      error: "Invalid or expired OTP. Please request a new OTP.",
    });
    return;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Create user
  const user = await User.create({
    first_name,
    last_name,
    email,
    password: hashedPassword,
    role: "admin",
    is_email_verified: true,
  });

  // Generate tokens
  const accessToken = signAccess(user._id as Types.ObjectId);
  const refreshToken = await issueRefreshToken(user._id as Types.ObjectId);

  // Send welcome email (non-blocking)
  const displayName = `${first_name}${last_name ? " " + last_name : ""}`;
  sendWelcomeEmail(email, displayName).catch(() => {});

  reply.status(201).send({
    success: true,
    message: "Admin account created successfully.",
    access_token: accessToken,
    refresh_token: refreshToken,
  });
};
