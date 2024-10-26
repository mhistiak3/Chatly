import React, { memo, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import { smapleUsers } from "../../constants/smaple.data";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { primaryColor } from "../../constants/colors";

const AddGroupMemberDialog = memo(({ open, onClose,  }) => {
  let members = smapleUsers;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);

  };
 const handleAddMember = (id) => {
  const MemberSelect = members.find((member) => member.id === id);
   if (!selectedMembers.includes(MemberSelect)) {
     setSelectedMembers([...selectedMembers, MemberSelect]);
   }
  
   
 };

 const handleRemoveMember = (id) => {
   setSelectedMembers(selectedMembers.filter((m) => m.id !== id));
 };


  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Group Members</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField
            label="Search for users"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
          />

          <List sx={{ maxHeight: "200px", overflowY: "auto" }}>
            {members.map((member) => (
              <React.Fragment key={member.id}>
                <ListItem
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#3b3b3b",
                    borderRadius: "8px",
                    marginBottom: "0.5rem",
                    "&:hover": {
                      backgroundColor: "#444",
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={member.avatar} alt={member.name} />
                  </ListItemAvatar>
                  <ListItemText primary={member.name} sx={{ color: "#fff" }} />
                  <IconButton
                    edge="end"
                    onClick={() =>
                      selectedMembers.includes(member)
                        ? handleRemoveMember(member.id)
                        : handleAddMember(member.id)
                    }
                    sx={{
                      background: selectedMembers.includes(member)
                        ? "#f44336"
                        : primaryColor,
                    }}
                  >
                    {selectedMembers.includes(member) ? (
                      <RemoveIcon />
                    ) : (
                      <AddIcon />
                    )}
                  </IconButton>
                </ListItem>
                <Divider sx={{ backgroundColor: "#555" }} />
              </React.Fragment>
            ))}
          </List>

        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{ color: "crimson", border: "1px solid crimson" }}
        >
          Cancel
        </Button>
        <Button
          //   onClick={() => onAddMember(selectedMembers)}
          color="primary"
          variant="contained"
          disabled={selectedMembers.length === 0}
        >
          Add Members
        </Button>
      </DialogActions>
    </Dialog>
  );
})

export default AddGroupMemberDialog;
