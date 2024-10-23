import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Button,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { smapleUsers } from "../../constants/smaple.data";


const NewGroup = ({ open, onClose, onCreate }) => {
  let members = smapleUsers
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleAddMember = (id) => {
    if (!selectedMembers.includes(id)) {
      setSelectedMembers([...selectedMembers, id]);
    }
  };

  const handleRemoveMember = (id) => {
    setSelectedMembers(selectedMembers.filter((m) => m !== id));
  };

  const handleCreateGroup = () => {
    onCreate(groupName, selectedMembers);
    setGroupName("");
    setSelectedMembers([]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ backgroundColor: "#1f1f1f", color: "#fff" }}>
        Create New Group
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#2c2c2c" }}>
        {/* Group Name Input */}
        <TextField
          label="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
          sx={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            backgroundColor: "#3b3b3b",
          }}
        />

        {/* Member List */}
        <Typography variant="h6" sx={{ color: "#fff", marginTop: "1rem" }}>
          Add Members
        </Typography>
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
                    selectedMembers.includes(member.id)
                      ? handleRemoveMember(member.id)
                      : handleAddMember(member.id)
                  }
                  sx={{
                    background: selectedMembers.includes(member.id)
                      ? "#f44336"
                      : "#74268c",
                  }}
                >
                  {selectedMembers.includes(member.id) ? <RemoveIcon /> : <AddIcon />}
                </IconButton>
              </ListItem>
              <Divider sx={{ backgroundColor: "#555" }} />
            </React.Fragment>
          ))}
        </List>

        {/* Action Buttons */}
        <Box display="flex" justifyContent="space-between" marginTop="1rem">
          <Button
            variant="outlined"
            color="error"
            onClick={onClose}
            sx={{ width: "45%" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateGroup}
            sx={{ width: "45%" }}
            disabled={!groupName || selectedMembers.length === 0}
          >
            Create Group
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default NewGroup;
