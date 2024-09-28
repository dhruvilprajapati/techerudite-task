export class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}

export const HTTP_ERRORS = {
  BadRequestError: class extends HttpError {
    constructor(message = "Bad Request") {
      super(message, 400);
    }
  },

  UnauthorizedError: class extends HttpError {
    constructor(message = "Unauthorized") {
      super(message, 401);
    }
  },

  NotFoundError: class extends HttpError {
    constructor(message = "Not Found") {
      super(message, 404);
    }
  },

  InternalServerError: class extends HttpError {
    constructor(message = "Internal Server Error") {
      super(message, 500);
    }
  },
};
