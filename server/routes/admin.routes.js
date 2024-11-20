import express from "express";
import {
  getAllChatsController,
  getAllUsersController,
  getAllMessagesController,
} from "../controllers/admin.controller.js";

const router = express.Router();

// admin routes
// router.get("/")
// router.post("/login")
// router.get("/logout")

// router.get("/states")
router.get("/get-all-users",getAllUsersController)
router.get("/get-all-chats", getAllChatsController);
router.get("/get-all-messages", getAllMessagesController);



export default router