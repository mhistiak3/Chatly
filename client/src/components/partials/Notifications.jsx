import React, { memo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  Box

} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotiifcationItem from "./NotiifcationItem";
import { smapleNotifications } from "../../constants/smaple.data";



const Notifications = ({ open, onClose }) => {
  const notifications = smapleNotifications;
  const navigate = useNavigate();

  const handleAccept = (id) => {
    console.log(`Deleted notification ${id}`);
  };

  const handleReject = (id) => {
    
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ backgroundColor: "#1f1f1f", color: "#fff" }}>
        Notifications
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#2c2c2c", padding: "0" }}>
        <List>
          {notifications.length > 0 ?notifications.map((notification) => (
            <NotiifcationItem
              key={notification.id}
              notification={notification}
              handleAccept={handleAccept}
              handleReject={handleReject}
            />
          )):(
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                color: "#fff",
              }}
            >
              No notifications
            </Box>
          )}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default memo(Notifications);
