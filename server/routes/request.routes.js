import express from "express";
import {
  sendFriendRequestController,
  acceptFriendRequestController,
  getNotificationsController,
} from "../controllers/request.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";


const router = express.Router();

// Protected route
router.use(isAuthenticated);

router.post("/send-friend-request", sendFriendRequestController);
router.put("/accept-friend-request", acceptFriendRequestController);

router.get("/get-notifications",getNotificationsController)




export default router;