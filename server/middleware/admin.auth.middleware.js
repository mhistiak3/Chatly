import jwt from "jsonwebtoken";
import { ADMIN_SECRET_KEY, JWT_SECRET } from "../config/config.js";
import customErrorHandler, {
  TryCatch,
} from "../services/custom.error.handler.js";

export const isAdminAuthenticated = TryCatch(async (req, res, next) => {
  let token = req.cookies["chatly-admin-token"];
  if (!token) {
    return customErrorHandler(res, "You are not logged in as admin", 401);
  }
  const decoded = jwt.verify(token, JWT_SECRET);
  if (!decoded) {
    return customErrorHandler(res, "You are not logged in as admin", 401);
  }
  if (decoded?.secretKey !== ADMIN_SECRET_KEY) {
    return customErrorHandler(res, "You are not logged in as admin", 401);
  }

  next();
});
