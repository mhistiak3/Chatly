const membersWithIds = (members) => {
    return members.map((member) => member._id.toString());
};

export { membersWithIds };