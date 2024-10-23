import { useParams } from "react-router-dom";
import { ChatList } from "..";
import { sampleChats } from "../../constants/smaple.data";
import Title from "../shared/Title";
import Header from "./Header";
import Grid from "@mui/material/Grid2";
export const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params?.chatId;
const handleDeleteChat = (e,id,group) => {
  console.log(id);
  
}

    return (
      <>
        <Title />
        <Header />
        <Grid container height={"calc(100vh - 3.7rem)"}>
          <Grid
            size={{ xs: 12, sm: 4 }}
            height={"100%"}
            bgcolor={"background.paper"}
          >
            <ChatList
              chats={sampleChats}
              chatId={Number(chatId)}
              newMessagesAlert={[
                {
                  chatId: 1,
                  count: 1,
                  lastMessage: "Good Bye,talk about later",
                },
              ]}
              onlineUsers={[1, 2]}
              handleDeleteChat={handleDeleteChat}
            />
          </Grid>
          <Grid
            size={{ xs: 12, sm: 8 }}
            bgcolor={"background.default"}
            height={"100%"}
          >
            <WrappedComponent {...props} />
          </Grid>
        </Grid>
      </>
    );
  };
};
