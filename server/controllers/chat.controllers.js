import { ALERT } from "../constants/events.js";
import Chat from "../models/chat.model.js";
import customErrorHandler, {
  TryCatch,
} from "../services/custom.error.handler.js";
import { emitEvent } from "../utils/features.js";

export const newGroupChatController = TryCatch(async (req, res) => {
  const { name, members } = req.body;

  if (members.length < 2) {
    return customErrorHandler(res, "At least 3 members are required", 400);
  }
  //   create group
  let allmembers = [...members, req.userId];
  await Chat.create({
    groupChat: true,
    name,
    members: allmembers,
    creator: req.userId,
  });

  // emit event
  emitEvent(req, ALERT, allmembers, `Welcome to ${name} group chat`);
  emitEvent(req, "REFETCH_CHATS", allmembers);

  return res.status(201).json({ success: true, message: "Group chat created" });
});
