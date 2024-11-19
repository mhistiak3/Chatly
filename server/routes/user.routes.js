import express from "express";
import {
  loginController,
  logoutController,
  profileController,
  registerController,
  searchUserController,
} from "../controllers/user.controller.js";
import { singleAvatar } from "../middleware/multer.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import {
  registerValidator,
  loginValidator,
  validateHandler,
} from "../utils/validators.js";

const router = express.Router();

router.post(
  "/register",
  singleAvatar,
  registerValidator(),
  validateHandler,
  registerController
);
router.post("/login", loginValidator(), validateHandler, loginController);

// Protected route
router.use(isAuthenticated);
router.get("/profile", profileController);
router.get("/logout", logoutController);
router.get("/search-user", searchUserController);

export default router;
