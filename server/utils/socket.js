import { v4 as uuid } from "uuid";
import Message from "../models/message.model.js";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "../constants/events.js";
import { userSockets } from "./helper.js";

export const userSocketIds = new Map();
function socketHandler(io) {

  io.on("connection", (socket) => {
    const user = {
      _id: "6731f39fc5cca4a6ff3b73da",
      name: "iA Coder",
    };

    userSocketIds.set(user._id.toString(), socket.id);
    // on new message
    socket.on(NEW_MESSAGE, (data) => {
      newMessageEventHandler(io, data, user);
    });

    // on disconnect
    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      userSocketIds.delete(user._id.toString());
    });
  });
}

// new messages event handler
async function newMessageEventHandler(io, data, user) {
  const { chatId, message, members } = data;
  const messageForDB = {
    chat: chatId,
    sender: user._id,
    content: message,
  };

  try {
    const message = await Message.create(messageForDB);
console.log(message);

    const membersSocketsIds = userSockets(members);
    io.to(membersSocketsIds).emit(NEW_MESSAGE, {
      message,
      chatId,
    });
    io.to(membersSocketsIds).emit(NEW_MESSAGE_ALERT, {
      chatId,
    });
  } catch (error) {
    console.log(error);
  }
  //   const messageForRealtime = {
  //     _id: uuid(),
  //     chat: chatId,
  //     sender: {
  //       _id: user._id,
  //       name: user.name,
  //     },
  //     content: message,
  //     createdAt: new Date().toISOString(),
  //   };
}

export default socketHandler;
