import React, { memo, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  List,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SearchUserItem from "./SearchUserItem";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../store/api/api";
import { toast } from "react-hot-toast";

const Search = memo(({ open, onClose }) => {
  const [searchTerm, setSearchTerm] = useState();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest] = useSendFriendRequestMutation();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // const filteredUsers = users.filter(
  //   (user) => !selectedUsers.includes(user._id)
  // );
  const handleAddFriend = async (id) => {
    // setSelectedUsers([...selectedUsers, id]);

    try {
      const res = await sendFriendRequest({ userId: id });
      if (res?.data) {
        toast.success(res?.data.message);
      } else {
        toast.error(res.error?.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
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
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
        <List>
          {users.map((user) => (
            <SearchUserItem
              key={user._id}
              user={user}
              handleAddFriend={handleAddFriend}
              isLoadin={isLoading}
              // selectedUsers={selectedUsers}
            />
          ))}
        </List>
        {users.length === 0 && <Divider />}
        {users.length === 0 && <p>No users found</p>}
      </DialogContent>
    </Dialog>
  );
});

export default Search;
