import { errorResponse } from "../utils/customResponse.utils.js";
import { HTTP_STATUS } from "./../constants/httpStatusCodes.constant.js";

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      return errorResponse({
        res,
        data: { message: errorMessage },
        statusCode: HTTP_STATUS.BAD_REQUEST,
      });
    }

    next();
  };
};
