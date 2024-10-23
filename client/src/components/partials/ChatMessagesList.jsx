import { Box, Stack, Typography } from "@mui/material";
import { memo } from "react";
import moment from "moment";
import Attachment from "./Attachment";

export const ChatMessagesList = memo(({ messages, handleMessageOptions }) => {
  return (
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
              background: msg.sender.id === "123" ? "#74268c" : "#121212",
              borderRadius: "10px",
              padding: "0.5rem",
              alignSelf: msg.sender.id === "123" ? "flex-end" : "flex-start",
              color: msg.sender.id === "123" ? "#fff" : "#000",
            }}
            onContextMenu={(e) => handleMessageOptions(e, msg)}
          >
            {/* Check if attachments exist and if it's an image */}
            {msg.attachments.length > 0 && msg.attachments[0].url && (
              <Attachment url={msg.attachments[0].url} />
            )}
            <Typography>{msg.content}</Typography>

            {/* Display the message creation time */}
            <Typography
              variant="caption"
              sx={{
                color: msg.sender.id === "123" ? "#ddd" : "#888",
                marginTop: "0.5rem",
              }}
            >
              {moment(msg.createdAt).fromNow()} ago
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
});
