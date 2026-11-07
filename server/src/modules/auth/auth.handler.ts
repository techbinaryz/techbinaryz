import { FastifyInstance } from "fastify";
import { sendOtp } from "./send-otp";
import { register } from "./register";
import { login } from "./login";
import { loginVerify } from "./login-verify";
import { refresh } from "./refresh";
import { logout } from "./logout";

export default async function authRoutes(fastify: FastifyInstance) {
  // Send OTP for registration
  fastify.post("/auth/send-otp", sendOtp);

  // Register new admin
  fastify.post("/auth/register", register);

  // Login (step 1 - credentials)
  fastify.post("/auth/login", login);

  // Login verify (step 2 - OTP)
  fastify.post("/auth/login/verify", loginVerify);

  // Refresh access token
  fastify.post("/auth/refresh", refresh);

  // Logout
  fastify.post("/auth/logout", logout);
}
