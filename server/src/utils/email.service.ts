import { env } from "process";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASSWORD,
  },
});

export const sendOtpEmail = async (email: string, otp: string): Promise<void> => {
  try {
    await transporter.sendMail({
      from: env.EMAIL_FROM,
      to: email,
      subject: "Your OTP Code - TechBinaryz",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Your Verification Code</h2>
          <p>Hello,</p>
          <p>Your OTP code is:</p>
          <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
            ${otp}
          </div>
          <p>This code will expire in ${env.OTP_EXPIRY_MINUTES} minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
          <p>Best regards,<br>TechBinaryz Team</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};

export const sendWelcomeEmail = async (email: string, name: string): Promise<void> => {
  try {
    await transporter.sendMail({
      from: env.EMAIL_FROM,
      to: email,
      subject: "Welcome to TechBinaryz Admin Panel",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to TechBinaryz!</h2>
          <p>Hello ${name},</p>
          <p>Your admin account has been successfully created.</p>
          <p>You can now access the admin panel and start managing the platform.</p>
          <p>Best regards,<br>TechBinaryz Team</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    // Don't throw - welcome email failure shouldn't block registration
  }
};
