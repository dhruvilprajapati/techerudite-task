import bcrypt from "bcryptjs";
import { UserService } from "./user.service.js";
import { generateToken } from "../utils/jwtToken.utils.js";
import { HTTP_ERRORS, HttpError } from "../utils/httpErrors.utils.js";

export class AuthService {
  constructor(userService = new UserService()) {
    this.userService = userService;
  }

  loginUser = async (email, password) => {
    try {
      const user = await this.userService.findUserByEmail(email);
      if (!user) {
        throw new HTTP_ERRORS.UnauthorizedError("Invalid email or password");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new HTTP_ERRORS.UnauthorizedError("Invalid email or password");
      }

      // Generate JWT token
      // const token = generateToken({ userId: user._id });

      // Remove password from user object
      const userObj = { ...user };
      delete userObj.password;
      const token = generateToken(
        {
          email: userObj.email,
          firstName: userObj.firstName,
          lastName: userObj.lastName,
        },
        "10d"
      );

      return { user: userObj, token };
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HTTP_ERRORS.InternalServerError("Error Logging In User");
    }
  };

  // Optional: If you prefer handling registration in AuthService
  registerUser = async (userData) => {
    try {
      const user = await this.userService.createUser(userData);

      // Generate JWT token
      const token = generateToken({ userId: user._id });

      return { user, token };
    } catch (error) {
      throw error; // Let the controller handle the error
    }
  };
}
