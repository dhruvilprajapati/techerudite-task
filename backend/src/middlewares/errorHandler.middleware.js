import { errorResponse } from "../utils/customResponse.utils.js";
import { HttpError } from "../utils/httpErrors.utils.js";

export const errorHandler = (error, req, res, next) => {
  if (error instanceof HttpError) {
    return errorResponse({
      res,
      data: {
        message: error.message,
      },
      statusCode: error.statusCode,
    });
  }
};
