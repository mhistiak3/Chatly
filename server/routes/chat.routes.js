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
    addMemberToGroupController,
  getUserChatController,
  getUserGroupsController,
  newGroupChatController,
  removeMemberFromGroupController,
} from "../controllers/chat.controllers.js";

// routes
const router = express.Router();

// Protected route
router.use(isAuthenticated); 
// all chats 
router.get("/get-user-chats", getUserChatController);
// group chat related routes
router.post("/new-group", newGroupChatController);
router.get("/get-user-groups", getUserGroupsController);
router.put("/add-members-to-group", addMemberToGroupController);
router.delete("/remove-members-from-group", removeMemberFromGroupController);

export default router;