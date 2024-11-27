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
import cors from "cors"
import { createServer } from "http";
import { Server } from "socket.io";
import { APP_PORT, CLIENT_URL, MONGO_DB_URI } from "./config/config.js";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import messageRoutes from "./routes/message.routes.js";
import requestRoutes from "./routes/request.routes.js";
import adminRoutes from "./routes/admin.routes.js";

import { connectDB } from "./config/mogodb.config.js";
import defaultErrorHandler from "./middleware/default.error.handler.js";
import socketHandler from "./utils/socket.js";

// app object
const app = express();
const server = createServer(app);
const io = new Server(server, {});

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({}));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", CLIENT_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT",  "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],

  })
);


// home route
app.get("/", (req, res) => {
  res.send("Chatly");
});

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/request", requestRoutes);
app.use("/api/v1/admin", adminRoutes);

// socket io connection
io.use((socket, next) => {
  next()
})
socketHandler(io);

// defult error handler
app.use(defaultErrorHandler);
// listen port
server.listen(APP_PORT, async () => {
  await connectDB(MONGO_DB_URI);
  console.log("Server is running on port ", APP_PORT);
});
