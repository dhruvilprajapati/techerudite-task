import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { loginSchema, registerSchema } from "../validations/auth.validation.js";
import { validateRequest } from "../middlewares/validation.middleware.js";

const authController = new AuthController();
const authRouter = Router();

authRouter.post("/login", validateRequest(loginSchema), authController.login);
authRouter.post(
  "/register",
  validateRequest(registerSchema),
  authController.register
);

export default authRouter;
