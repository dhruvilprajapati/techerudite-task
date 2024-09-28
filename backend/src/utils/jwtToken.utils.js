import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const generateToken = (payload, expiresIn = "1h") => {
  if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};
