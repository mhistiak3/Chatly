import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
const createToken = (userId) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: 15 * 24 * 60 * 60 * 1000,
  });
  return token;
};

export { createToken };
