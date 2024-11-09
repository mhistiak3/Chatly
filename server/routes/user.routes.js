import express from "express";
import {
  loginController,
  profileController,
  registerController,
} from "../controllers/user.controllers.js";
import { avatarUpload } from "../middleware/multer.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", avatarUpload.any(), registerController);
router.post("/login", loginController);
router.get("/profile", isAuthenticated, profileController);

export default router;
