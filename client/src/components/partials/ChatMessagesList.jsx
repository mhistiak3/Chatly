import { Box, Stack, Typography } from "@mui/material";
import { memo } from "react";

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
              <Box
                component="img"
                src={msg.attachments[0].url}
                alt="attachment"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  marginBottom: "0.5rem",
                }}
              />
            )}
            <Typography>{msg.content}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
});
