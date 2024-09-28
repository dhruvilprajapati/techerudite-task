import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure dotenv to load variables from your .env file
config({
  path: path.join(__dirname, "..", "..", ".env"),
});

// Validate critical environment variables
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

// Export the environment variables
export const env = {
  PORT: process.env.PORT || 8000,
  CONNECTION_STRING:
    process.env.CONNECTION_STRING || "mongodb://127.0.0.1:27017/AuthModule",
  JWT_SECRET: process.env.JWT_SECRET,
  EMAIL: process.env.EMAIL,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  SERVICE: process.env.SERVICE || "gmail",
  HOST: process.env.HOST || "smtp.gmail.com",
  BASE_URL: process.env.BASE_URL || "http://localhost:3000",
  API_URL: process.env.API_URL || "http://localhost:8080",
};
