import { Stack, TextField } from "@mui/material";
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

      {chats?.map((chat,index) => {
        const { id, groupChat, members, avatar, name, lastMessage } = chat;
        const newMessage = newMessagesAlert.find((alert) => alert.chatId === id);
        const isOnline = members.some((member) => onlineUsers.includes(member));
        return (
          <ChatItem
            key={index}
            id={id}
            index={index}
            groupChat={groupChat}
            members={members}
            avatar={avatar}
            name={name}
            newMessage={newMessage}
            isOnline={isOnline}
            sameSender={chatId === id}
            handleDeleteChatCaption={handleDeleteChat}
            lastMessage={lastMessage}
          />
        );
      })}
    </Stack>
  );
};
