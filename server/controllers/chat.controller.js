import { ALERT } from "../constants/events.js";
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import customErrorHandler, {
  TryCatch,
} from "../services/custom.error.handler.js";
import { emitEvent } from "../utils/features.js";
import { findNameById, membersWithIds } from "../utils/helper.js";

const getUserChatController = TryCatch(async (req, res) => {
  const chats = await Chat.find({ members: req.userId }).populate(
    "members",
    "name username avatar"
  );

  //   transform chats
  const transformedChats = chats.map((chat) => {
    return {
      _id: chat._id,
      name: chat.name,
      avatars: chat.groupChat
        ? chat.members.slice(0, 3).map((member) => member.avatar)
        : chat.members.find(
            (member) => member._id.toString() !== req.userId.toString()
          ).avatar,
      members: chat.members.reduce((prev, current) => {
        if (current._id.toString() !== req.userId.toString()) {
          prev.push(current._id.toString());
        }
        return prev;
      }, []),
      groupChat: chat.groupChat,
      creator: chat.creator,
    };
  });

  return res.status(201).json({ success: true, chats: transformedChats });
});

const newGroupChatController = TryCatch(async (req, res) => {
  const { name, members } = req.body;
  if (!name || !members) {
    return customErrorHandler(res, "Name and members are required", 400);
  }

  if (members.length < 2) {
    return customErrorHandler(res, "At least 3 members are required", 400);
  }
  //   create group
  let allmembers = [...new Set([...allmembers, ...members])];
  if (members.length < 2) {
    return customErrorHandler(res, "At least 3 members are required", 400);
  }
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

// get groups
const getUserGroupsController = TryCatch(async (req, res) => {
  const groups = await Chat.find({
    groupChat: true,
    creator: req.userId,
    members: req.userId,
  }).populate("members", "name username avatar");

  const transformedGroups = groups.map((group) => {
    return {
      _id: group._id,
      name: group.name,
      avatars: group.members.slice(0, 3).map((member) => member.avatar),
    };
  });

  return res.status(201).json({ success: true, groups: transformedGroups });
});

// add members to group
const addMemberToGroupController = TryCatch(async (req, res) => {
  // get data and validate
  const { chatId, members } = req.body;
  if (!chatId || !members || !members.length) {
    return customErrorHandler(res, "ChatId and members are required", 400);
  }

  //   check if group exists and is a group
  const groupChat = await Chat.findById(chatId).populate("members", "name");
  if (!groupChat) {
    return customErrorHandler(res, "Group not found", 404);
  }
  if (!groupChat.groupChat) {
    return customErrorHandler(res, "Not a group chat", 400);
  }

  //   check if user is the creator
  if (groupChat.creator.toString() !== req.userId.toString()) {
    return customErrorHandler(res, "You are not allwed to add members", 401);
  }

  // added members name

  const allMembersName = await User.find({
    _id: { $in: members },
  }).select("name");

  //   check if user is already in the group and add members to group
  groupChat.members = [
    ...new Set([...groupChat.members.map((m) => m._id.toString()), ...members]),
  ];
  if (groupChat.members.length > 100) {
    customErrorHandler(res, "You can't add more than 100 members", 400);
  }
  await groupChat.save();

  // emit event
  emitEvent(
    req,
    ALERT,
    membersWithIds(groupChat.members),
    `${allMembersName
      .map((member) => member.name)
      .join(", ")} has been added to ${groupChat.name} group chat`
  );
  emitEvent(req, "REFETCH_CHATS", membersWithIds(groupChat.members));
  return res.status(201).json({
    success: true,
    message: `You have been added to ${groupChat.name} group chat`,
  });
});

// remove members from group
const removeMemberFromGroupController = TryCatch(async (req, res) => {
  // get data and validate
  const { chatId, memberId } = req.body;
  if (!chatId || !memberId) {
    return customErrorHandler(res, "ChatId and members are required", 400);
  }

  // check if group exists and is a group
  const isGroup = await Chat.findOne({
    _id: chatId,
    members: memberId,
  }).populate("members", "name");
  if (!isGroup) {
    return customErrorHandler(res, "Group or member not found", 404);
  }
  if (!isGroup.groupChat) {
    return customErrorHandler(res, "Not a group chat", 400);
  }
  if (isGroup.creator.toString() !== req.userId.toString()) {
    return customErrorHandler(res, "You are not allwed to remove members", 401);
  }
  if (isGroup.creator.toString() === memberId.toString()) {
    return customErrorHandler(res, "You can't remove the creator", 400);
  }

  // check if group has at least 3 members
  if (isGroup.members.length <= 3) {
    return customErrorHandler(res, "Group must have at least 3 members", 400);
  }

  let removedMemberName = findNameById(isGroup.members, memberId);
  // remove member from group
  isGroup.members = isGroup.members.filter(
    (member) => member._id.toString() !== memberId
  );
  await isGroup.save();

  // emit event
  emitEvent(
    req,
    ALERT,
    membersWithIds(isGroup.members),
    `${removedMemberName} have been removed from ${isGroup.name} group chat`
  );
  emitEvent(req, "REFETCH_CHATS", membersWithIds(isGroup.members));

  return res.status(200).json({
    success: true,
    message: `${removedMemberName}  have been removed from ${isGroup.name} group chat`,
  });
});

// leave group
const leaveMemberFromGroupController = TryCatch(async (req, res) => {
  // get data and validate
  const { chatId } = req.params;
  const memberId = req.userId;
  console.log(memberId);

  if (!chatId || !memberId) {
    return customErrorHandler(res, "ChatId and members are required", 400);
  }

  // check if group exists and is a group
  const isGroup = await Chat.findOne({
    _id: chatId,
    members: memberId,
  }).populate("members", "name");
  if (!isGroup) {
    return customErrorHandler(res, "Group or member not found", 404);
  }
  if (!isGroup.groupChat) {
    return customErrorHandler(res, "Not a group chat", 400);
  }

  let leaveMemberName = findNameById(isGroup.members, memberId);
  // leave member and creator ar same
  let remainingMembers = isGroup.members.filter(
    (member) => member._id.toString() !== memberId
  );
  if (remainingMembers.length === 1) {
    return customErrorHandler(
      res,
      "Only one member in group chat, can't leave insted delete group",
      400
    );
  }
  if (isGroup.creator.toString() === req.userId.toString()) {
    let randomMember =
      remainingMembers[Math.floor(Math.random() * remainingMembers.length)];
    isGroup.creator = randomMember._id;
  }

  // leave member from group
  isGroup.members = remainingMembers;
  await isGroup.save();

  // emit event
  emitEvent(
    req,
    ALERT,
    membersWithIds(isGroup.members),
    `${leaveMemberName} has benn leaved from ${isGroup.name} group chat`
  );
  emitEvent(req, "REFETCH_CHATS", membersWithIds(isGroup.members));

  return res.status(200).json({
    success: true,
    message: `you  have been leved from ${isGroup.name} group chat`,
  });
});

// rename group
const renameGroup = TryCatch(async (req, res) => {
  const { chatId } = req.params;
  const { name } = req.body;
  if (!chatId || !name) {
    return customErrorHandler(res, "ChatId and name are required", 400);
  }

  // check if group exists and is a group
  const isGroup = await Chat.findById(chatId);
  if (!isGroup) {
    return customErrorHandler(res, "Group not found", 404);
  }
  if (!isGroup.groupChat) {
    return customErrorHandler(res, "Not a group chat", 400);
  }


  // check if user is the creator
  if (isGroup.creator.toString() !== req.userId.toString()) {
    return customErrorHandler(res, "You are not allwed to rename group", 401);
  }

  // rename group
  isGroup.name = name;
  await isGroup.save();

  // response
  return res.status(200).json({
    success: true,
    message: `Group has been renamed to ${name}`,
  });
});

// ================== Chats ================== //
// Chat details Controller
const getChatDetailsController = TryCatch(async (req, res) => {
  if (Boolean(req.query.populate)) {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId)
      .populate("members", "name username avatar")
      .lean();

    // if chat not exist
    if (!chat) {
      return customErrorHandler(res, "Chat not found", 404);
    }
    chat.members = chat.members.map(({ name, _id, avatar }) => ({
      _id,
      name,
      avatar: avatar?.url,
    }));

    return res.status(200).json({ success: true, chat });
  } else {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId);

    // if chat not exist
    if (!chat) {
      return customErrorHandler(res, "Chat not found", 404);
    }

    return res.status(200).json({ success: true, chat });
  }
});

export {
  getUserChatController,
  newGroupChatController,
  getUserGroupsController,
  addMemberToGroupController,
  removeMemberFromGroupController,
  leaveMemberFromGroupController,
  renameGroup,
  getChatDetailsController,
};
