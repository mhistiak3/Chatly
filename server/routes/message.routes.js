/*
 * Title: Chat Routes
 * Description: Chatly Chat Routes
 * Author: Istiak Ahammad
 * Date: 10/30/2024
 *
 */

// import module
import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { attchmentsUpload } from "../middleware/multer.js";
import { getChatMessagesController, sendAttachmentsController } from "../controllers/message.controller.js";


// routes
const router = express.Router();

// Protected route
router.use(isAuthenticated);

// message related routes
router.post("/send-attachments",attchmentsUpload, sendAttachmentsController);

// Get Chat details
router.route("/:chatId").get(getChatMessagesController).put().delete();

export default router;
