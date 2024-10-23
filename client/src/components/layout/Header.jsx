import {
  AppBar,
  Avatar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  ArrowDropDown as ArrowDropDownIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import MenuItemBox from "../partials/MenuItemBox";
import { lazy, Suspense, useState } from "react";

const SearchDialog = lazy(() => import("../partials/Search"));
const NotificationsDialog = lazy(() => import("../partials/Notifications"));
const NewGroupDialog = lazy(() => import("../partials/NewGroup"));
const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNotifications, setIsNotifications] = useState(false);
   const [newGroup, setNewGroup] = useState(false);
   

  const handleMobile = () => {
    setMobile((prev) => !prev);
  };
  const openSearch = () => {
    setIsSearch((prev) => !prev);
   
    
  };
  const openNotifications = () => {
    setIsNotifications((prev) => !prev);
  };
   const openNewGroup = () => {
     setNewGroup((prev) => !prev);
   };
  const toggleDrawer = () => {
    setOpenMenu((prev) => !prev);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar
        position="static"
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          height: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Toolbar
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            <IconButton
              sx={{ mr: 1, display: { sm: "none" }, fontWeight: "bold" }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              component="img"
              src="/logo.png"
              sx={{ width: { xs: "1.8rem", sm: "2.5rem" }, mr: 0.6 }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1rem", sm: "1.5rem" },
              }}
            >
              Chatly
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <IconButton onClick={() => openSearch()}>
              <SearchIcon />
            </IconButton>

            <IconButton onClick={openNotifications}>
              <Badge badgeContent={1} color="error" overlap="circular">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Box
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              onClick={toggleDrawer}
            >
              <Avatar
                alt="User Name"
                sx={{
                  width: { xs: 30, sm: 40 },
                  height: { xs: 30, sm: 40 },
                  color: "primary.contrastText",
                }}
              />
              <ArrowDropDownIcon
                sx={{ ml: "-4px", color: "primary.contrastText" }}
                fontSize="large"
              />
            </Box>
            {openMenu && <MenuItemBox openNewGroup={openNewGroup} />}
          </Box>
        </Toolbar>
      </AppBar>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog open={isSearch} onClose={openSearch} />
        </Suspense>
      )}
      {isNotifications && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationsDialog open={isNotifications} onClose={openNotifications} />
        </Suspense>
      )}
      {newGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog open={newGroup} onClose={openNewGroup} />
        </Suspense>
      )}
    </Box>
  );
};
export default Header;
