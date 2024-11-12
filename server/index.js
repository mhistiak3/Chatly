/*
 * Title: Chatly
 * Description:  App Server
 * Author: Istiak Ahammad
 * Date: 10/30/2024
 *
 */

// import module
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { APP_PORT, MONGO_DB_URI } from "./config/config.js";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import messageRoutes from "./routes/message.routes.js";

import { connectDB } from "./config/mogodb.config.js";
import defaultErrorHandler from "./middleware/default.error.handler.js";


// app object
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({}));
app.use(cookieParser());

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/message", messageRoutes);

// defult error handler
app.use(defaultErrorHandler);
// listen port
app.listen(APP_PORT, async () => {
  await connectDB(MONGO_DB_URI);
  console.log("Server is running on port ", APP_PORT);
});
