import { useParams } from "react-router-dom";
import { ChatList } from "..";
import Title from "../shared/Title";
import Header from "./Header";
import Grid from "@mui/material/Grid2";
import { useUserChatsQuery } from "../../store/api/api";
import { Skeleton } from "@mui/material";
import useErrors from "../../hooks/useErrors";

export const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params?.chatId;
    // all chats
    const { isLoading, data, isError, error, refetch } = useUserChatsQuery("");
    useErrors([{ isError, error }]);

    const handleDeleteChat = (e, id, group) => {
      console.log(id);
    };

    return (
      <>
        <Title />
        <Header />
        <Grid
          container
          height={"calc(100vh - 3.5rem)"}
          sx={{ position: "relative" }}
        >
          <Grid
            size={{ xs: 12, sm: 4 }}
            height={"100%"}
            bgcolor={"background.paper"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
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
            )}
          </Grid>
          <Grid
            size={{ xs: 12, sm: 8 }}
            bgcolor={"background.default"}
            // height={"100%"}
            sx={{
              position: { xs: "absolute", sm: "relative" },
              padding: { xs: "10px 0 ", sm: "0" },
              top: 0,
              left: 0,
              zIndex: 1000,
            }}
          >
            <WrappedComponent {...props} />
          </Grid>
        </Grid>
      </>
    );
  };
};
