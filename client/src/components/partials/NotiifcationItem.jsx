import {
  Avatar,
  Box,
  Divider,

  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
} from "@mui/material";
import React, { memo } from "react";

const NotificationItem = ({ notification, handleAccept, handleReject }) => {
  return (
    <React.Fragment key={notification.id}>
      <ListItem
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#3b3b3b",
          borderRadius: "8px",
          padding: "1rem",
          marginBottom: "0.5rem",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#444",
          },
        }}
       
      >
        <ListItemAvatar>
          <Avatar
            src={notification.sender.avatar}
            alt={notification.sender.name}
          />
        </ListItemAvatar>
        <ListItemText
          primary={`${notification.sender.name} sent you a friend request`}
          secondary={notification.time}
          sx={{ color: "#fff" }}
        />
        <Box display="flex" gap={1}>
          {/* Accept Button */}
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleAccept(notification.id);
            }}
          >
            Accept
          </Button>

          {/* Reject Button */}
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleReject(notification.id);
            }}
          >
            Reject
          </Button>
        </Box>
      </ListItem>
      <Divider sx={{ backgroundColor: "#555" }} />
    </React.Fragment>
  );
};

export default memo(NotificationItem);
