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
import { APP_PORT } from "./config/config.js";
import userRouters from "./routes/user.routes.js";
import defultErrorHandler from "./middleware/default.error.handler.js";

// app object
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({}));

// routes
app.use("/api/v1/user", userRouters);

// defult error handler
app.use(defultErrorHandler);
// listen port
app.listen(APP_PORT, () => {
  console.log("Server is running on port 3000");
});
