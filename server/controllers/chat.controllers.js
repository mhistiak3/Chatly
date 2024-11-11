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

export const getUserChatController = TryCatch(async (req, res) => {
  const chats = await Chat.find({ members: req.userId }).populate(
    "members",
    "name username avatar"
  );

  //   transform chats
  const transformedChats = chats.map((chat) => {
    return {
      _id: chat._id,
      name: chat.name,
      members: chat.members.reduce((prev, current) => {
        if (current._id.toString() !== req.userId.toString()) {
          prev.push(current._id.toString());
        }
        return prev;
      }, []),
      groupChat: chat.groupChat,
      creator: chat.creator,
      avatars: chat.groupChat
        ? chat.members.slice(0, 3).map((member) => member.avatar)
        : chat.members.find(
            (member) => member._id.toString() !== req.userId.toString()
          ).avatar,
    };
  });

  return res.status(201).json({ success: true, chats: transformedChats });
});

// get groups
export const getUserGroupsController = TryCatch(async (req, res) => {
  const groups = await Chat.find({
    groupChat: true,
    creator: req.userId,
    members: req.userId,
  }).populate("members", "name username avatar");

  const transformedGroups = groups.map((group) => {
    return {
      _id: group._id,
      name: group.name,
      avatars: group.members.slice(0, 3).map((member) => member.avatar)
      ,
    };
  });

  return res.status(201).json({ success: true, groups: transformedGroups });
});
