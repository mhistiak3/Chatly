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
  deleteChatController,
  getChatDetailsController,
  getUserChatController,
  getFriendsController,
  getUserGroupsController,
  leaveMemberFromGroupController,
  newGroupChatController,
  removeMemberFromGroupController,
  renameGroupController,
} from "../controllers/chat.controller.js";

// routes
const router = express.Router();

// Protected route
router.use(isAuthenticated); 
// all chats 
router.get("/get-user-chats", getUserChatController);
// friend chats
router.get("/get-friends", getFriendsController);


// group chat related routes
router.post("/new-group", newGroupChatController);
router.get("/get-user-groups", getUserGroupsController);
router.put("/add-members-to-group", addMemberToGroupController);
router.put("/remove-member-from-group", removeMemberFromGroupController);
router.delete("/leave-member-from-group/:chatId", leaveMemberFromGroupController);

// * Get Chat details * 
router
  .route("/:chatId")
  .get(getChatDetailsController)
  .put(renameGroupController)
  .delete(deleteChatController);


export default router;