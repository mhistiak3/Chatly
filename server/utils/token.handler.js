import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_VALID_TIME } from "../config/config.js";
const createToken = (userId) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: Number(JWT_VALID_TIME),
  });
  return token;
};

export { createToken };
