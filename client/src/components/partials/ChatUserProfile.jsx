import React, { memo } from "react";
import moment from "moment";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Box,
  Typography,
  Divider,

  Card,
  CardMedia,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import Attachment from "./Attachment";

const ChatUserProfile = ({
  name,
  avatar,
  username,
  bio,
  joinDate,
  allMediaInChat,
  open,
  onClose,
}) => {
  console.log(allMediaInChat);
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* Dialog Header */}
      <DialogTitle
        sx={{
          backgroundColor: "#1f1f1f",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        User Profile
        <IconButton onClick={onClose} sx={{ color: "#fff" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{ backgroundColor: "#1f1f1f", color: "#fff", padding: "2rem" }}
      >
        {/* User Info Section */}
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar
            src={avatar}
            alt={name}
            sx={{ width: 80, height: 80, marginRight: "1.5rem" }}
          />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {name}
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              @{username}
            </Typography>
          </Box>
        </Box>

        {/* Bio Section */}
        <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
          {bio}
        </Typography>

        <Divider sx={{ backgroundColor: "#555", marginBottom: "1rem" }} />

        {/* Join Date */}
        <Typography
          variant="body2"
          sx={{ color: "gray", marginBottom: "1rem" }}
        >
          Joined on {moment(joinDate).fromNow()}
        </Typography>

        <Divider sx={{ backgroundColor: "#555", marginBottom: "1rem" }} />

        {/* Media Section */}
        <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
          Media in Chat
        </Typography>
        {allMediaInChat.length > 0 ? (
          <Grid container spacing={2}>
            {allMediaInChat.map((media, index) => (
              <Grid item xs={6} key={index}>
                <Card
                  sx={{
                    backgroundColor: "#2c2c2c",
                    borderRadius: "8px",
                  }}
                  component={"a"}
                  href={media[0]?.url}
                  target="_blank"
                  rel="noopener"
                >
                  <CardMedia
                    
                    sx={{ objectFit: "cover", borderRadius: "8px" }}
                    height="100"
                 
                  >
                    <Attachment url={media[0]?.url} />
                  </CardMedia>
                  {/* <CardMedia
                    component="img"
                    sx={{ objectFit: "cover", borderRadius: "8px" }}
                    height="100"
                    image={media[0]?.url}
                    alt={`Media ${index + 1}`}
                  /> */}
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body2" sx={{ color: "gray" }}>
            No media shared in this chat.
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default memo(ChatUserProfile)
