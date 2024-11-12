const membersWithIds = (members) => {
    return members.map((member) => member._id.toString());
};

const findNameById = (members, id) => {
    return members.find((member) => member._id.toString() === id).name;
};

export { membersWithIds, findNameById };