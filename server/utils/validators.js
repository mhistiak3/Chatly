import { body, validationResult } from "express-validator";
import customErrorHandler from "../services/custom.error.handler.js";

// Register validator
const registerValidator = () => {
  const fields = ["name", "username", "bio"];
  return [
    ...fields.map((field) =>
      body(field)
        .isLength({ min: 2 })
        .withMessage(
          `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } must be at least 2 characters long`
        )
    ),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ];
};

// Login validator
const loginValidator = () => {
  return [
    body("username")
      .isLength({ min: 2 })
      .withMessage("Username must be at least 2 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ];
};

// Validation handler
const validateHandler = (req, res, next) => {
  const errors = validationResult(req);


  if (errors.isEmpty()) {
    return next();
  }
  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(", ");

  customErrorHandler(res, errorMessages,422);
};

export { registerValidator, loginValidator, validateHandler };
