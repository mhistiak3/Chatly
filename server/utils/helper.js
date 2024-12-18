import { userSocketIds } from "./socket.js";

const membersWithIds = (members) => {
  return members.map((member) => member._id.toString());
};

const findNameById = (members, id) => {
  return members.find((member) => member._id.toString() === id).name;
};

const membersWithoutMe = (members, myId) => {
  return members.find((member) => member._id.toString() !== myId);
};

const userSockets = (members = []) => {
  console.log(members);
  console.log(userSocketIds);
  
 return members.map((member) => userSocketIds.get(member.toString()));
  
};

const getBase64 = (file) => `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

export {
  membersWithIds,
  findNameById,
  membersWithoutMe,
  userSockets,
  getBase64,
};
