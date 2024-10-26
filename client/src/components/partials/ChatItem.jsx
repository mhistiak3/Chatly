import { Box, Stack, Typography, Avatar, Badge } from "@mui/material";
import { Link } from "..";
import { memo } from "react";
import AvatarCard from "./AvatarCard";
import { primaryColor } from "../../constants/colors";

const ChatItem = ({
  avatar = [],
  name = "",
  id,
  index,
  lastMessage,
  groupChat,
  sameSender,
  newMessage = {},
  handleDeleteChatCaption,
  isOnline,
}) => {
  
  return (
    <Link
      to={`/chat/${id}`}
      style={{ textDecoration: "none", width: "100%" }}
      onContextMenu={(e) => handleDeleteChatCaption(e, id, groupChat)}
    >
      <Box
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #333",
          padding: "1rem",
          backgroundColor: sameSender ? "#1f1f2f" : "#121212",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "#333",
          },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          
         <AvatarCard avatar={avatar} groupChat={groupChat} isOnline={isOnline} name={name}/>

          <Stack>
            <Typography
              variant="body1"
              sx={{
                fontWeight: newMessage?.count > 0 ? "bold" : "normal",
                color: "#fff",
              }}
            >
              {name}
            </Typography>
            <Typography
              variant="body2"
              color={newMessage?.count > 0 ? primaryColor : "#aaa"}
              sx={{
                fontWeight: newMessage?.count > 0 ? "bold" : "normal",
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              {newMessage?.count > 0
                ? newMessage?.lastMessage?.slice(0, 20)
                : lastMessage?.slice(0, 30) || "No messages yet"}{" "}
              {newMessage?.lastMessage?.length > 20 && "..."}
              {newMessage?.count > 0
                ? ""
                : lastMessage?.length > 30
                ? "..."
                : ""}
              {newMessage?.count > 0 && (
                <Typography
                  component="span"
                  sx={{
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "0.7rem",
                    ml: 1,
                  }}
                >
                  {newMessage?.count}
                </Typography>
              )}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Link>
  );
};

export default memo(ChatItem);
