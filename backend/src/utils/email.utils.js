import nodemailer from "nodemailer";
import { env } from "../config/env.js";

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: env.service || "gmail",
  host: env.host || "smtp.gmail.com",
  auth: {
    user: env.EMAIL,
    pass: env.EMAIL_PASSWORD,
  },
});

// Function to send verification email
export const sendVerificationEmail = async (email, token) => {
  try {
    const verificationLink = `${env.BASE_URL}/verify/verify-email?token=${token}`;

    // Define the email content
    const mailOptions = {
      from: env.SMTP_FROM_EMAIL,
      to: email,
      subject: "Verify Your Email Address",
      html: `
        <h1>Email Verification</h1>
        <p>Thank you for registering. Please verify your email by clicking the link below:</p>
        <a href="${verificationLink}">Verify Email</a>
        <p>If you did not request this, please ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to:", email);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Could not send verification email");
  }
};
