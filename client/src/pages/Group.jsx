import React, { lazy, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, List, ListItem, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import AvatarCard from "../components/partials/AvatarCard";
import { SelectedGroupComponent } from "../components";
import { sampleChats } from "../constants/smaple.data";
import { useSearchParams } from "react-router-dom";
const AddGroupMemberDialog = lazy(() => import("../components/partials/AddGroupMemberDialog")); 
const DeleteDialog = lazy(() => import("../components/partials/DeleteDialog")); 

const Group = () => {
  const [groups, setGroups] = useState(
    sampleChats.filter((chat) => chat.groupChat)
  );
  const [addMemberDialogToggle, setAddMemberDialogToggle] = useState(false);
  const [deleteDialogToggle, setDeleteDialogToggle] = useState(false);
  const [searchParams] = useSearchParams();
  const groupId = searchParams.get("groupId");
  const [selectedGroup, setSelectedGroup] = useState(false);

  const navigate = useNavigate();
  const handleGroupSelect = (e, group) => {
    if (groupId == group.id) {
      e.preventDefault();
    }
    setSelectedGroup(true);
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
                component={Link}
                to={`?groupId=${group?.groupId}`}
                key={group.id}
                sx={{
                  color: selectedGroup?.id === group.id ? "#74268c" : "#fff",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#3b3b3b" },
                }}
                onClick={(e) => handleGroupSelect(e, group)}
              >
                <AvatarCard
                  avatar={group.avatar}
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
          <SelectedGroupComponent
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
            groupId={groupId}
            setAddMemberDialogToggle={setAddMemberDialogToggle}
            setDeleteDialogToggle={setDeleteDialogToggle}
          />
        ) : (
          <Typography variant="h6" color="gray">
            Select a group to manage
          </Typography>
        )}
      </Box>
      {addMemberDialogToggle && (
        <AddGroupMemberDialog
          open={addMemberDialogToggle}
          onClose={() => setAddMemberDialogToggle(false)}
        />
      )}
      {deleteDialogToggle && (
        <DeleteDialog
          open={deleteDialogToggle}
          onClose={() => setDeleteDialogToggle(false)}
        />
      )}
    </Box>
  );
};

export default Group;
