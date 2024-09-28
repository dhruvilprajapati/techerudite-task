import cors from "cors";
import express from "express";
import { HTTP_STATUS } from "./constants/httpStatusCodes.constant.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import router from "./routes/index.routes.js";
import { successResponse } from "./utils/customResponse.utils.js";

// Instantiating the server
const app = express();

app.get("/", (req, res) => {
  return successResponse({
    res,
    data: {
      message: "Welcome to the Authorization Server",
    },
    statusCode: HTTP_STATUS.OK,
  });
});

// registering the middlewares

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

// Registering the main router
app.use("/api", router);

app.use(errorHandler);

export default app;
