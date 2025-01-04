import React, { memo, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  List,
  Divider,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SearchUserItem from "./SearchUserItem";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../store/api/api";
import useAsyncMutation from "../../hooks/useAsyncMutation";

const Search = memo(({ open, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest, isFriendRequestLoading] = useAsyncMutation(
    useSendFriendRequestMutation
  );

  // send friend request
  const handleAddFriend = async (id) => {
    await sendFriendRequest("Friend request sending...", { userId: id });
  };

  // search users
  useEffect(() => {
    const id = setTimeout(() => {
      setIsLoading(true);
      searchUser(searchTerm)
        .then(({ data }) => {
          setUsers(data?.user);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);
    return () => clearTimeout(id);
  }, [searchTerm]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ bgcolor: "background.paper" }}>Find Users</DialogTitle>
      <DialogContent sx={{ bgcolor: "background.paper" }}>
        <TextField
          autoFocus
          margin="dense"
          label="Search"
          type="text"
          fullWidth
          variant="outlined"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
        {isFriendRequestLoading && (
          <Typography sx={{ paddingY: "10px" }}>
            Sending friend request...
          </Typography>
        )}
        <List>
          {users.map((user) => (
            <SearchUserItem
              key={user._id}
              user={user}
              handleAddFriend={handleAddFriend}
              isLoading={isLoading}
              // selectedUsers={selectedUsers}
              handleLoading={isFriendRequestLoading}
            />
          ))}
        </List>

        {users.length === 0 && <Divider />}
        {users.length === 0 && <Typography>No users found</Typography>}
      </DialogContent>
    </Dialog>
  );
});

export default Search;
