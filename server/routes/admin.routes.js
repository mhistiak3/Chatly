import express from "express";
import {
  getAllChatsController,
  getAllUsersController,
  getAllMessagesController,
  getAllStatsController,
  adminLoginController,
  adminLogoutController,
} from "../controllers/admin.controller.js";

const router = express.Router();

// admin routes
// router.get("/")
router.post("/login", adminLoginController);
router.get("/logout", adminLogoutController);

router.get("/get-stats", getAllStatsController);
router.get("/get-all-users",getAllUsersController)
router.get("/get-all-chats", getAllChatsController);
router.get("/get-all-messages", getAllMessagesController);



export default router