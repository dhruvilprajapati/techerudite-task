import { AuthService } from "../services/auth.service.js";
import {
  errorResponse,
  successResponse,
} from "../utils/customResponse.utils.js";
import { HTTP_STATUS } from "../constants/httpStatusCodes.constant.js";
import { HTTP_ERRORS } from "../utils/httpErrors.utils.js";
import { UserService } from "../services/user.service.js";

export class AuthController {
  constructor(
    authService = new AuthService(),
    userService = new UserService()
  ) {
    this.authService = authService;
    this.userService = userService;
  }

  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new HTTP_ERRORS.BadRequestError(
          "Email and password are required"
        );
      }

      const { user, token } = await this.authService.loginUser(email, password);

      return successResponse({
        res,
        data: { user, token },
        statusCode: HTTP_STATUS.OK,
      });
    } catch (error) {
      return errorResponse({
        res,
        data: { message: error.message || "Invalid email or password" },
        statusCode: error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
      });
    }
  };

  register = async (req, res) => {
    try {
      const userData = req.body;

      const { user } = await this.authService.registerUser(userData);

      return successResponse({
        res,
        data: { user },
        statusCode: HTTP_STATUS.CREATED,
      });
    } catch (error) {
      return errorResponse({
        res,
        data: { message: error.message || "Error registering user" },
        statusCode: error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
      });
    }
  };
}
