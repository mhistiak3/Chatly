import React, { memo, useState } from "react";
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
import { smapleUsers } from "../../constants/smaple.data";



const Search = memo(({ open, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(smapleUsers);
  const isLoading = false;
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleAddFriend = (id) => {
    console.log(`Added friend with id: ${id}`);
  };

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
          {filteredUsers.map((user) => (
            <SearchUserItem
              key={user.id}
              user={user}
              handleAddFriend={handleAddFriend}
              isLoadin={isLoading}
            />
          ))}
        </List>
        {filteredUsers.length === 0 && <Divider />}
        {filteredUsers.length === 0 && <p>No users found</p>}
      </DialogContent>
    </Dialog>
  );
});

export default Search;
