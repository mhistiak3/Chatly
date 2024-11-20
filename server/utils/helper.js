const membersWithIds = (members) => {
  return members.map((member) => member._id.toString());
};

const findNameById = (members, id) => {
  return members.find((member) => member._id.toString() === id).name;
};

const membersWithoutMe = (members, myId) => {
  return members.find((member) => member._id.toString() !== myId);
};

export { membersWithIds, findNameById, membersWithoutMe };
