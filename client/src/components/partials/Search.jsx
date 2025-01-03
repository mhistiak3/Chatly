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
import { useLazySearchUserQuery } from "../../store/api/api";

const Search = memo(({ open, onClose }) => {
  const [searchTerm, setSearchTerm] = useState();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchUser] = useLazySearchUserQuery();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    !selectedUsers.includes(user._id)
  );
  const handleAddFriend = (id) => {
      setSelectedUsers([...selectedUsers, id]);
    
  };
  useEffect(() => {
    const id = setTimeout(() => {
      setIsLoading(true);
      searchUser(searchTerm).then(({data})=>{
        setUsers(data?.user)
        
      }).catch((err)=>{
        console.log(err);
      }).finally(()=>{
        setIsLoading(false)
      })
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
          {filteredUsers.map((user) => (
            <SearchUserItem
              key={user._id}
              user={user}
              handleAddFriend={handleAddFriend}
              isLoadin={isLoading}
              selectedUsers={selectedUsers}
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
