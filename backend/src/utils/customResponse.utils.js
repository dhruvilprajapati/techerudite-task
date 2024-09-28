export const successResponse = ({ res, data, statusCode }) => {
  return res.status(statusCode).send({ data: { ...data }, status: "success" });
};

export const errorResponse = ({ res, data, statusCode }) => {
  return res.status(statusCode).send({ data: { ...data }, status: "failure" });
};
