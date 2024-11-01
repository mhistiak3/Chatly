import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/user.controllers.js";
import { avatarUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/register", avatarUpload.any(), registerController);
router.post("/login", loginController);

export default router;
