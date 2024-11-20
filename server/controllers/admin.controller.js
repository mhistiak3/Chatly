import User from "../models/user.model.js";
import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
import customErrorHandler, {
  TryCatch,
} from "../services/custom.error.handler.js";
import { ADMIN_SECRET_KEY, JWT_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";

// admin login
const adminLoginController = TryCatch(async (req, res) => {
  const { secretKey } = req.body;
  if (!secretKey) {
    return customErrorHandler(res, "Please provide secret key", 400);
  }
  //   check secret key
  const isMatch = secretKey === ADMIN_SECRET_KEY;
  if (!isMatch) {
    return customErrorHandler(res, "Invalid secret key", 401);
  }
  const token = jwt.sign({ secretKey }, JWT_SECRET, { expiresIn: "15m" });

  // response and set cookie
  return res
    .status(200)
    .cookie("chatly-admin-token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 15,
    })
    .json({ success: true, token, message: "Admin logged in successfully" });
});

// admin check
const adminCheckController = TryCatch(async (req, res) => {
  return res.status(200).json({ admin: true });
});

// admin logout
const adminLogoutController = TryCatch(async (req, res) => {
  return res
    .status(200)
    .clearCookie("chatly-admin-token", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .json({ success: true, message: "Admin logged out successfully" });
});

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

// get all states
const getAllStatsController = TryCatch(async (req, res) => {
  const [groupsCount, usersCount, messagesCount, totaChatCount] =
    await Promise.all([
      Chat.countDocuments({ groupChat: true }),
      User.countDocuments(),
      Message.countDocuments(),
      Chat.countDocuments(),
    ]);

  // chart
  const today = new Date();
  const last7Days = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const last7DaysMessages = await Message.find({
    createdAt: { $gte: last7Days, $lte: today },
  }).select("createdAt");

  const messages = new Array(7).fill(0);
  last7DaysMessages.forEach((message) => {
    const indexApproximate =
      (today.getTime() - message.createdAt.getTime()) / (1000 * 60 * 60 * 24);
    const index = Math.floor(indexApproximate);
    messages[6 - index]++;
  });

  const statas = {
    groupsCount,
    usersCount,
    messagesCount,
    totaChatCount,
    last7DaysMessages,
    messagesChart: messages,
  };

  // response
  return res.status(200).json({ success: true, statas });
});

export {
  getAllUsersController,
  adminLogoutController,
  adminLoginController,
  getAllChatsController,
  getAllMessagesController,
  getAllStatsController,
  adminCheckController,
};
