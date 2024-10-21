import {
  Person as PersonIcon,
  Groups as GroupsIcon,
  GroupAdd as AddIcon,
  Logout as LogoutIcon,
  Chat as ChatIcon,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const MenuItemBox = () => {
  const navigate = useNavigate();
  const [newGroup, setNewGroup] = useState(false);
  const navigateToGroups = () => {
    navigate("/groups");
  };
  const navigateToChats = () => {
    navigate("/");
  };
  const openNewGroup = () => {
      setNewGroup((prev) => !prev);
  }
  const logoutHandler = () => {};
  return (
    <Box
      sx={{
        position: "absolute",
        top: "65px",
        right: "10px",
        width: "200px",
        height: "250px",
        bgcolor: { xs: "background.default", sm: "background.paper" },
        display: "flex",
        flexDirection: "column",
        borderRadius: "4px",
      }}
    >
      <Box
        sx={{
          padding: " 12px 20px",
          transition: "0.5s",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          ":hover": {
            backgroundColor: "primary.main",
            color: "primary.contrastText",
          },
        }}
      >
        <PersonIcon /> Profile
      </Box>
      <Box
        onClick={navigateToChats}
        sx={{
          padding: " 12px 20px",
          transition: "0.5s",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          ":hover": {
            backgroundColor: "primary.main",
            color: "primary.contrastText",
          },
        }}
      >
        <ChatIcon /> Chats
      </Box>
      <Box
        onClick={navigateToGroups}
        sx={{
          padding: " 12px 20px",
          transition: "0.5s",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          ":hover": {
            backgroundColor: "primary.main",
            color: "primary.contrastText",
          },
        }}
      >
        <GroupsIcon /> Groups
      </Box>
      <Box
        sx={{
          padding: " 12px 20px",
          transition: "0.5s",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          ":hover": {
            backgroundColor: "primary.main",
            color: "primary.contrastText",
          },
        }}
      >
        <AddIcon /> Make Group
      </Box>
      <Box
        sx={{
          padding: " 12px 20px",
          transition: "0.5s",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          ":hover": {
            backgroundColor: "primary.main",
            color: "primary.contrastText",
          },
        }}
      >
        <LogoutIcon /> Lgout
      </Box>
    </Box>
  );
};
export default MenuItemBox;
