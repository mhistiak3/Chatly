import customErrorHandler, {
  TryCatch,
} from "../services/custom.error.handler.js";
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import { emitEvent } from "../utils/features.js";
import { NEW_ATTACHMENTS, NEW_MESSAGE_ALERT } from "../constants/events.js";
import Message from "../models/message.model.js";
const sendAttachmentsController = TryCatch(async (req, res) => {
  const { chatId } = req.body;
  if (!chatId) {
    return customErrorHandler(res, "ChatId is required", 400);
  }
  const userId = req.userId;

  const [chat, user] = await Promise.all([
    Chat.findById(chatId),
    User.findById(userId),
  ]);

  if (!chat) {
    return customErrorHandler(res, "Chat not found", 404);
  }
  const files = req.files || [];

  //   check files
  if (files.length < 1) {
    return customErrorHandler(res, "No files found", 400);
  }
  if (files.length > 5) {
    return customErrorHandler(res, "Max 5 files allowed", 400);
  }

  //   Upload files here
  const attachments = [
    {
      public_id: "1",
      url: "https://randomuser.me/api/portraits/men/6.jpg",
    },
  ];

  //

  const messageForDB = {
    content: "",
    attachments,
    sender: user._id,
    chat: chat._id,
  };
  const messageForRealTime = {
    ...messageForDB,
    sender: {
      _id: user._id,
      name: user.name,
    },
  };

  await Message.create(messageForDB);

  // Emit event
  emitEvent(req, NEW_ATTACHMENTS, chat.members, {
    message: messageForRealTime,
    chatId: chat._id,
  });

  emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });

  res
    .status(200)
    .json({ success: true, message: "Attachment sent successfully" });
});

// Chat details Controller
const getChatMessagesController = TryCatch(async (req, res) => {
  
  return res.status(200).json({ success: true, chat });
});

export { sendAttachmentsController, getChatMessagesController };
