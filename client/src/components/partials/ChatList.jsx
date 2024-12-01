import { Stack, TextField, Typography } from "@mui/material";
import ChatItem from "./ChatItem";

export const ChatList = ({
  chats = [],
  chatId,
  newMessagesAlert = [],
  onlineUsers = [],
  handleDeleteChat,
}) => {
  return (
    <Stack
      width={"100%"}
      height={"calc(100vh - 3.7rem)"}
      direction={"column"}
      spacing={1.5}
      overflow={"auto"}
      sx={{
        padding: "0.5rem",
        marginTop: { xs: "1rem", sm: "0" },
        backgroundColor: "#1e1e1e",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#555",
          borderRadius: "10px",
        },
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search chats..."
        sx={{
          marginBottom: "1rem",
          marginTop: "1rem",
          input: {
            color: "#fff",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#555",
            },
            "&:hover fieldset": {
              borderColor: "#888",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#fff",
            },
          },
        }}
      />

      {chats.length > 0 ? (
        chats?.map((chat, index) => {
          const {
            _id: id,
            groupChat,
            members,
            avatars,
            name,
        
          } = chat;
          const newMessage = newMessagesAlert.find(
            (alert) => alert.chatId === id
          );
          const isOnline = members.some((member) =>
            onlineUsers.includes(member)
          );
          return (
            <ChatItem
              key={index}
              id={id}
              index={index}
              groupChat={groupChat}
              members={members}
              avatar={avatars}
              name={name}
              newMessage={newMessage}
              isOnline={isOnline}
              sameSender={chatId === id}
              handleDeleteChatCaption={handleDeleteChat}
            
            />
          );
        })
      ) : (
        <Typography variant="body1">No Chats</Typography>
      )}
    </Stack>
  );
};
