import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import Request from "../models/request.model.js";
import Chat from "../models/chat.model.js";
import customErrorHandler, {
  TryCatch,
} from "../services/custom.error.handler.js";
import { emitEvent } from "../utils/features.js";

// send friend request
const sendFriendRequestController = TryCatch(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return customErrorHandler(res, "UserId is required", 400);
  }
  // check if request is already sedned
  const request = await Request.findOne({
    $or: [
      { sender: req.userId, reciver: userId },
      { sender: userId, reciver: req.userId },
    ],
  });
  if (request) {
    return customErrorHandler(res, "Request already sent", 400);
  }
  // send friend request
  await Request.create({
    sender: req.userId,
    reciver: userId,
  });

  // emit event
  emitEvent(req, NEW_REQUEST, [userId]);

  //   send response
  return res
    .status(201)
    .json({ success: true, message: "Friend request sent" });
});

// accept friend request
const acceptFriendRequestController = TryCatch(async (req, res) => {
  const { requestId, accept } = req.body;
  // validation
  if (!requestId) {
    return customErrorHandler(res, "RequestId is required and must be valid", 400);
  }
  if (![true, false].includes(accept)) {
    return customErrorHandler(res, "Accept is required and must be boolean", 400);
  }

  // find request
  const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("reciver", "name");
  if (!request) {
    return customErrorHandler(res, "Request not found", 404);
  }
  // check reciver
  if (request.reciver._id.toString() !== req.userId.toString()) {
    return customErrorHandler(
      res,
      "You are not allowed to accept this request",
      401
    );
  }

  // if request is rejected
  if (!accept) {
    await request.deleteOne();
    res.status(200).json({ success: true, message: "Request rejected" });
    return;
  }

  // if request is accepted
  const members = [request.sender._id, request.reciver._id];

  // create chat
  await Promise.all([
    Chat.create({
      groupChat: false,
      name: `${request.sender.name} - ${request.reciver.name}`,
      members,
      creator: request.sender._id,
    }),
    request.deleteOne(),
  ]);

  // emit event
  emitEvent(req, REFETCH_CHATS, members);

  //   response
  return res
    .status(200)
    .json({ success: true, message: "Request accepted",
        senderId: request.sender._id,
     });
});


// get notifications
const getNotificationsController = TryCatch(async (req, res) => {
  const requests = await Request.find({ reciver: req.userId })
    .populate("sender", "name avatar")
 
  return res.status(200).json({ success: true, requests });
});

export {
  sendFriendRequestController,
  acceptFriendRequestController,
  getNotificationsController,
};
