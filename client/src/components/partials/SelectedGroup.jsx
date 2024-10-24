import {
  Box,
  Button,
  TextField,
  Avatar,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { memo, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { sampleGroup } from "../../constants/smaple.data";
export const SelectedGroupComponent = memo(
  ({ selectedGroup, setSelectedGroup, groupId, setAddMemberDialogToggle }) => {
    const [isEditing, setIsEditing] = useState(false);

    const group = sampleGroup.find((group) => group.id == groupId);

    const [groupName, setGroupName] = useState(group?.name);

    const handleEditGroupName = () => {
      setIsEditing(true);
    };

    const handleSaveGroupName = () => {
      // Logic for saving the updated group name
      setIsEditing(false);
    };
    const handleRemoveMember = (memberId) => {
      // Logic for removing a member
    };

    const handleAddMember = () => {
      setAddMemberDialogToggle(true);
    };

    const handleDeleteGroup = (groupId) => {
      // Logic for deleting the group
    };
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 1000,
          position: { xs: "absolute", md: "relative" },
          background: { xs: "#1f1f1f", md: "transparent" },
          top: { xs: "0", md: "0" },
          height: { xs: "100vh", md: "100%" },
          overflow: "auto",
          padding: "10px",
        }}
      >
        {/* Back button for mobile */}
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            width: "100%",
            textAlign: "left",
            mb: 2,
          }}
        >
          <IconButton onClick={() => setSelectedGroup(null)}>
            <ArrowBackIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>

        {group?.name && (
          <>
            {" "}
            {/* Editable Group Name */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              {isEditing ? (
                <TextField
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{ color: "#fff", mr: 1 }}
                />
              ) : (
                <Typography variant="h5" color="#fff" sx={{ mr: 1 }}>
                  {groupName}
                </Typography>
              )}
              <IconButton
                onClick={isEditing ? handleSaveGroupName : handleEditGroupName}
                sx={{ color: "#fff" }}
              >
                {isEditing ? <CheckIcon /> : <EditIcon />}
              </IconButton>
            </Box>
            {/* Group Members with Avatar and Name */}
            <List sx={{ width: "100%", color: "#fff", mb: 2 }}>
              {group.members.map((member) => (
                <ListItem
                  key={member.id}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Avatar src={member.avatar} sx={{ mr: 2 }} />
                  <Typography variant="body1" sx={{ flexGrow: 1 }}>
                    {member.name}
                  </Typography>
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => handleRemoveMember(member.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
            {/* Add/Remove Members and Delete Group */}
            <Button
              variant="outlined"
              color="primary"
              startIcon={<PersonAddIcon />}
              onClick={handleAddMember}
              sx={{ marginBottom: "1rem" }}
            >
              Add Member
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDeleteGroup(selectedGroup.id)}
              sx={{ marginTop: "2rem" }}
            >
              Delete Group
            </Button>
          </>
        )}
      </Box>
    );
  }
);
