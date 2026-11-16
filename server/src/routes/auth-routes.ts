import { FastifyInstance } from "fastify";
import { sendOtp } from "../modules/auth/send-otp";
import { register } from "../modules/auth/register";
import { login } from "../modules/auth/login";
import { loginVerify } from "../modules/auth/login-verify";
import { refresh } from "../modules/auth/refresh";
import { logout } from "../modules/auth/logout";
import { adminSendOtp } from "../modules/auth/admin-send-otp";
import { adminLogin } from "../modules/auth/admin-login";

export default async function authRoutes(fastify: FastifyInstance) {
  // Send OTP for registration
  fastify.post("/auth/send-otp", sendOtp);

  // Register new admin
  fastify.post("/auth/register", register);

  // Login (step 1 - credentials)
  fastify.post("/auth/login", login);

  // Login verify (step 2 - OTP)
  fastify.post("/auth/login/verify", loginVerify);

  // Admin-specific login routes (for configured ADMIN_EMAIL only)
  fastify.post("/auth/admin/send-otp", adminSendOtp);
  fastify.post("/auth/admin/login", adminLogin);

  // Refresh access token
  fastify.post("/auth/refresh", refresh);

  // Logout
  fastify.post("/auth/logout", logout);
}
