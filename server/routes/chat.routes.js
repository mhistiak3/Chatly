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
import {
  getUserChatController,
  getUserGroupsController,
  newGroupChatController,
} from "../controllers/chat.controllers.js";

// routes
const router = express.Router();

// Protected route
router.use(isAuthenticated); 
// new group chat
router.post("/new-group", newGroupChatController);
router.get("/get-user-chats", getUserChatController);
router.get("/get-user-groups", getUserGroupsController);

export default router;