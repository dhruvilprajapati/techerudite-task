import app from "./app.js";
import { connectMongoDB } from "./config/database.js";
import { env } from "./config/env.js";

connectMongoDB(env.CONNECTION_STRING);

app.listen(env.PORT, () =>
  console.log(`Server is fired on http://localhost:${env.PORT}`)
);
