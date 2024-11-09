import express from "express";
import {
  loginController,
  logoutController,
  profileController,
  registerController,
} from "../controllers/user.controllers.js";
import { avatarUpload } from "../middleware/multer.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", avatarUpload.any(), registerController);
router.post("/login", loginController);

// Protected route
router.use(isAuthenticated);
router.get("/profile", profileController);
router.get("/logout", logoutController);


export default router;
