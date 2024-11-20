import User from "../models/user.model.js";
import Chat from "../models/chat.model.js";
import { TryCatch } from "../services/custom.error.handler.js";
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

export { getAllUsersController };
