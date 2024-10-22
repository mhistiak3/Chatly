import { Box, Stack } from "@mui/material";
import ChatItem from "./ChatItem";

export const ChatList = ({
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [{ chatId: "", count: 0 }],
  handleDeleteChat,
}) => {
  return (
    <Stack width={"100%"} direction={"column"}>
      {chats?.map((chat) => (
        <ChatItem />
      ))}
    </Stack>
  );
};
