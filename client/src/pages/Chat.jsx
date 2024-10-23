import React, { lazy, Suspense, useState } from "react";
import { AppLayout } from "../components";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  TextField,
  Stack,
  Divider,
  Backdrop,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import {
  PhotoCamera,
  VideoLibrary as VideoCamera,
  AudioFile,
  FileCopy,
} from "@mui/icons-material";
const ChatUserProfile = lazy(() =>
  import("../components/partials/ChatUserProfile")
);

const Chat = () => {
  const [chatUserProfileDialog, setChatUserProfileDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! How can I help you today?", sender: "other" },
    { id: 2, text: "Can you tell me more about your services?", sender: "me" },
  ]);

  // Dummy user data
  const user = {
    name: "Istiak Ahammad",
    image: "https://avatars.githubusercontent.com/u/65768155?s=400",
    status: "Active now",
    joinDate: "2024-10-23T12:55:43.620Z",
    bio: "I am a professional Web Developer. I am very passionate and dedicated to my work.",
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: message, sender: "me" },
      ]);
      setMessage("");
    }
  };

  const handleMessageOptions = (e, message) => {
    e.preventDefault();
    console.log(`Options for: ${message.text}`);
  };

  const handleFileChange = (file) => {
    // Handle file upload here
    console.log(file);
  };

  const handleUploadClick = (inputId) => {
    document.getElementById(inputId).click();
  };

  const openChatUserProfile = () => {
    setChatUserProfileDialog((prev) => !prev);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
        backgroundColor: "#121212",
        color: "#fff",
        borderLeft: "1px solid #333",
      }}
    >
      {/* Top Section: User Info */}
      {chatUserProfileDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ChatUserProfile
            open={chatUserProfileDialog}
            onClose={openChatUserProfile}
            name={user.name}
            avatar={user.image}
            username={user.name}
            bio={user.bio}
            joinDate={user.joinDate}
            allMediaInChat={[
              { id: 1, type: "image", url: "https://picsum.photos/200" },]}
          />
        </Suspense>
      )}
      <Box
        sx={{
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#1f1f1f",
        }}
      >
        <Avatar
          src={user.image}
          alt={user.name}
          sx={{ width: 50, height: 50, marginRight: "1rem" }}
        />
        <Box sx={{ cursor: "pointer" }} onClick={openChatUserProfile}>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="body2" color="gray">
            {user.status}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ margin: "0.5rem 0" }} />

      {/* Middle Section: Chat Messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: "1rem",
          backgroundColor: "#1f1f1f",
        }}
      >
        <Stack spacing={2}>
          {messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                background: msg.sender === "me" ? "#74268c" : "#121212",
                borderRadius: "10px",
                padding: "0.5rem",
                alignSelf: msg.sender === "me" ? "flex-end" : "flex-start",
                color: msg.sender === "me" ? "#fff" : "#000",
              }}
              onContextMenu={(e) => handleMessageOptions(e, msg)}
            >
              <Typography>{msg.text}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      <Divider sx={{ margin: "0.5rem 0" }} />

      {/* Bottom Section: Input Box */}
      <Box
        sx={{
          padding: "0.5rem",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#1f1f1f",
        }}
      >
        <IconButton
          onClick={() => setShowUploadOptions(!showUploadOptions)}
          sx={{ color: "#74268c" }}
        >
          <AttachFileIcon />
        </IconButton>

        {showUploadOptions && (
          <Box
            sx={{
              position: "absolute",
              bottom: "70px",
              left: "10px",
              background: "#121212",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              borderRadius: "8px",
              zIndex: 10,
              padding: "0.5rem",
              width: "80px",
            }}
          >
            <Grid container spacing={1}>
              {/* Image Upload */}
              <Grid size={12}>
                <IconButton
                  sx={{ color: "#74268c" }}
                  onClick={() => handleUploadClick("image")}
                >
                  <PhotoCamera />
                </IconButton>
                <TextField
                  id="image"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e.target.files[0])}
                />
              </Grid>
              {/* Video Upload */}
              <Grid size={12}>
                <IconButton
                  sx={{ color: "#74268c" }}
                  onClick={() => handleUploadClick("video")}
                >
                  <VideoCamera />
                </IconButton>
                <TextField
                  id="video"
                  type="file"
                  accept="video/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e.target.files[0])}
                />
              </Grid>
              {/* Audio Upload */}
              <Grid size={12}>
                <IconButton
                  sx={{ color: "#74268c" }}
                  onClick={() => handleUploadClick("audio")}
                >
                  <AudioFile />
                </IconButton>
                <TextField
                  id="audio"
                  type="file"
                  accept="audio/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e.target.files[0])}
                />
              </Grid>
              {/* File Upload */}
              <Grid size={12}>
                <IconButton
                  sx={{ color: "#74268c" }}
                  onClick={() => handleUploadClick("file")}
                >
                  <FileCopy />
                </IconButton>
                <TextField
                  id="file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e.target.files[0])}
                />
              </Grid>
            </Grid>
          </Box>
        )}

        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          variant="outlined"
          placeholder="Type a message..."
          fullWidth
          sx={{
            marginLeft: "0.5rem",
            backgroundColor: "#121212",
            borderRadius: "10px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
            },
          }}
        />
        <IconButton onClick={handleSendMessage} sx={{ color: "#74268c" }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AppLayout()(Chat);
