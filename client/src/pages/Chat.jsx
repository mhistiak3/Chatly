import React, { lazy, Suspense, useState } from "react";
import { AppLayout, ChatMessagesList, SendMessageBox } from "../components";
import {
  Box,
  Avatar,
  Typography,
  Divider,
  Backdrop,
  IconButton,
} from "@mui/material";
import { sampleMessages } from "../constants/smaple.data";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ChatUserProfile = lazy(() =>
  import("../components/partials/ChatUserProfile")
);

const Chat = () => {
  const [chatUserProfileDialog, setChatUserProfileDialog] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState(sampleMessages);
  const messagesAttachment = messages
    .filter((message) => message.attachments.length > 0)
    .map(({ attachments }) => attachments);
  const navigate = useNavigate();

  // Dummy user data
  const chatUser = {
    name: "Istiak Ahammad",
    image: "https://avatars.githubusercontent.com/u/65768155?s=400",
    status: "Active now",
    joinDate: "2024-10-23T12:55:43.620Z",
    bio: "I am a professional Web Developer. I am very passionate and dedicated to my work.",
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // setMessages([
      //   ...messages,
      //   { id: messages.length + 1, content: message, sender: "me" },
      // ]);
      setMessage("");
    }
  };

  const handleMessageOptions = (e, message) => {
    e.preventDefault();
    console.log(`Options for: ${message.content}`);
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
  
        height: "calc(100vh - 3.7rem)",
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
            name={chatUser.name}
            avatar={chatUser.image}
            username={chatUser.name}
            bio={chatUser.bio}
            joinDate={chatUser.joinDate}
            allMediaInChat={messagesAttachment}
          />
        </Suspense>
      )}

      <Box
        sx={{
          padding: { xs: "0.5rem", sm: "1rem" },
          display: "flex",
          alignItems: "center",
          backgroundColor: "#1f1f1f",
        }}
      >
        <IconButton
          sx={{
            color: "#fff",
            marginRight: "1rem",
            display: { xs: "block", sm: "none" },
          }}
          onClick={() => navigate("/")}
        >
          <ArrowBackIcon />
        </IconButton>
        <Avatar
          src={chatUser.image}
          alt={chatUser.name}
          sx={{ width: 50, height: 50, marginRight: "1rem" }}
        />
        <Box sx={{ cursor: "pointer" }} onClick={openChatUserProfile}>
          <Typography variant="h6" >{chatUser.name}</Typography>
          <Typography variant="body2" color="gray">
            {chatUser.status}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ margin: "0.5rem 0" }} />

      {/* Middle Section: Chat Messages */}
      <ChatMessagesList
        messages={messages}
        handleMessageOptions={handleMessageOptions}
      />

      <Divider sx={{ margin: "0.5rem 0" }} />

      {/* Bottom Section: Input Box */}
      <SendMessageBox
        handleUploadClick={handleUploadClick}
        handleFileChange={handleFileChange}
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
      />
    </Box>
  );
};

export default AppLayout()(Chat);
