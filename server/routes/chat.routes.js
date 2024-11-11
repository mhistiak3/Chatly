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
import { getChatController, newGroupChatController } from "../controllers/chat.controllers.js";

// routes
const router = express.Router();

// Protected route
router.use(isAuthenticated); 
// new group chat
router.post("/new-group", newGroupChatController);
router.get("/get-chats", getChatController);

export default router;