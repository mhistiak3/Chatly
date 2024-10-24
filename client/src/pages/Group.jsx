import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  Typography,
  IconButton,
  
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import AvatarCard from "../components/partials/AvatarCard";
import { SelectedGroup } from "../components";

const Group = () => {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Developers",
      members: [
        {
          id: 1,
          name: "John",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        {
          id: 2,
          name: "Jane",
          avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        {
          id: 3,
          name: "Mark",
          avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        },
       
        
      ],
    },
    {
      id: 2,
      name: "Designers",
      members: [
        {
          id: 4,
          name: "Lucy",
          avatar: "https://randomuser.me/api/portraits/women/6.jpg",
        },
      ],
    },
  ]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [groupName, setGroupName] = useState("");
  const navigate = useNavigate();
  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    setGroupName(group.name);
    setIsEditing(false);
  };



  const handleEditGroupName = () => {
    setIsEditing(true);
  };

  const handleSaveGroupName = () => {
    // Logic for saving the updated group name
    setIsEditing(false);
  };
  const backToChat = () => {
    navigate("/");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        position: "relative",
        height: "100vh",
        p: 2,
        bgcolor: "#1f1f1f",
      }}
    >
      {/* Left Side: Group List */}
      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
          bgcolor: "#2c2c2c",
          p: 2,
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          mb: { xs: 2, md: 0 },
        }}
      >
        <Typography variant="h6" color="#fff" mb={2}>
          <IconButton sx={{ color: "#fff" }} onClick={backToChat}>
            <ArrowBackIcon />
          </IconButton>{" "}
          Groups
        </Typography>
        {groups.length > 0 ? (
          <List>
            {groups.map((group) => (
              <ListItem
                key={group.id}
                sx={{
                  color: selectedGroup?.id === group.id ? "#74268c" : "#fff",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#3b3b3b" },
                }}
                onClick={() => handleGroupSelect(group)}
              >
                <AvatarCard
                  avatar={group.members.map((member) => member.avatar)}
                  groupChat={true}
                  name={group.name}
                />
                <Typography sx={{ ml: 2 }}> {group.name}</Typography>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography color="gray">No group created</Typography>
        )}
      </Box>

      {/* Right Side: Group Management */}
      <Box
        sx={{
          width: { xs: "100%", md: "70%" },
          bgcolor: "#2c2c2c",
          ml: { md: 2 },
          p: 3,
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {selectedGroup ? (
          <SelectedGroup
            selectedGroup={selectedGroup}
            groupName={groupName}
            setGroupName={setGroupName}
            isEditing={isEditing}
            handleEditGroupName={handleEditGroupName}
            handleSaveGroupName={handleSaveGroupName}
            setSelectedGroup={setSelectedGroup}
          />
        ) : (
          <Typography variant="h6" color="gray">
            Select a group to manage
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Group;
