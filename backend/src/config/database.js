import mongoose from "mongoose";
import { HTTP_ERRORS } from "../utils/httpErrors.utils.js";

export async function connectMongoDB(connectionString) {
  try {
    await mongoose.connect(connectionString);
    console.log(`Database connection established`);
  } catch (error) {
    throw new HTTP_ERRORS.InternalServerError();
  }
}
