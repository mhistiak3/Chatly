import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
const SearchUserItem = ({ user, handleAddFriend, isLoading }) => {
  return (
    <ListItem
      key={user.id}
      sx={{
        borderRadius: "8px",
        backgroundColor: "#3b3b3b",
        marginBottom: "0.5rem",
        "&:hover": {
          backgroundColor: "#444",
        },
      }}
      secondaryAction={
        <IconButton
        disabled={isLoading}
          edge="end"
          aria-label="add"
          onClick={handleAddFriend}
          sx={{ color: "#fff", bgcolor: "#74268c" }}
        >
          <AddIcon />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar src={user.avatar} alt={user.name} />
      </ListItemAvatar>
      <ListItemText primary={user.name} sx={{ color: "#fff" }} />
    </ListItem>
  );
};
export default SearchUserItem;
