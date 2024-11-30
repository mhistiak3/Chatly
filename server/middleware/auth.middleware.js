import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/config.js";
import customErrorHandler, {
  TryCatch,
} from "../services/custom.error.handler.js";

export const isAuthenticated = TryCatch(async (req, res, next) => {

  
  let token = req.cookies["chatly-token"];
  if (!token) {
    return customErrorHandler(res, "You are not logged in", 401);
  }
  const decoded = jwt.verify(token, JWT_SECRET);
  if (!decoded) {
    return customErrorHandler(res, "You are not logged in", 401);
  }
  // find user and check id is exist
  const user = await User.findById(decoded.userId);
  if (!user) {
    return customErrorHandler(res, "User not found, please login", 404);
  }
  req.userId = decoded.userId;
  next();
});
