import User from "../models/user.model.js";
import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
import { TryCatch } from "../services/custom.error.handler.js";

// get all users
const getAllUsersController = TryCatch(async (req, res) => {
  const users = await User.find({});

  // transform users
  const transformedUsers = await Promise.all(
    users.map(async (user) => {
      const { _id, name, username, avatar } = user;
      const [groups, friends] = await Promise.all([
        Chat.countDocuments({ groupChat: true, members: _id }),
        Chat.countDocuments({ groupChat: false, members: _id }),
      ]);

      return { _id, name, username, avatar, groups, friends };
    })
  );
  return res.status(200).json({ success: true, users: transformedUsers });
});

// get all chats
const getAllChatsController = TryCatch(async (req, res) => {
  const chats = await Chat.find({})
    .populate("members", "name avatar")
    .populate("creator", "name avatar");

  // transform chats
  const transformedChats = await Promise.all(
    chats.map(async ({ _id, name, groupChat, members, creator }) => {
      const totalMessages = await Message.countDocuments({ chat: _id });
      return {
        _id,
        name,
        groupChat,
        members: members.map((member) => ({
          _id: member._id,
          name: member.name,
          avatar: member.avatar,
        })),
        avatar: members.slice(0, 3).map((member) => member.avatar),
        creator,
        totalMembers: members.length,
        totalMessages,
      };
    })
  );

  return res.status(200).json({ success: true, chats: transformedChats });
});

// get all messages
const getAllMessagesController = TryCatch(async (req, res) => {
  const messages = await Message.find({})
    .populate("sender", "name avatar")
    .populate("chat", "groupChat");


    // response
    return res.status(200).json({ success: true, messages });
});

export {
  getAllUsersController,
  getAllChatsController,
  getAllMessagesController,
};
