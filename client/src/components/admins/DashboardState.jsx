import { Box, Paper, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import MessageIcon from "@mui/icons-material/Message";
import Widget from "./Widget";

const AdminStats = () => {
  return (
    <Box
      sx={{
        marginTop: "3rem",
        display: "flex",
        justifyContent: {
          xs: "center",
          md: "space-between",
        },
        gap: "1.5rem",
        flexWrap: "wrap",
      }}
    >
      <Widget
        title={"Users"}
        count={10}
        icon={<PersonIcon />}
        color={"#4caf50"}
      />
      <Widget
        title={"Groups"}
        count={5}
        icon={<GroupIcon />}
        color={"#2196f3"}
      />
      <Widget
        title={"Messages"}
        count={45}
        icon={<MessageIcon />}
        color={"#ff9800"}
      />
    </Box>
  );
};

export default AdminStats;
