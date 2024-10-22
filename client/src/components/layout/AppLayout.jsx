
import { ChatList } from "..";
import Title from "../shared/Title";
import Header from "./Header";
import Grid from "@mui/material/Grid2";
export const AppLayout = () => (WrappedComponent) => {
  return (props) => {
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
            <ChatList chats={[1,2,3,4,5,6]}/>
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

