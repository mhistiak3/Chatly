import React, { memo, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Chip,
  Typography,
} from "@mui/material";

const AddGroupMemberDialog = memo(({ open, onClose,  }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddMember = () => {
    if (searchTerm) {
      setSelectedMembers([...selectedMembers, searchTerm]);
      setSearchTerm(""); // Clear the input
    }
  };

  const handleRemoveMember = (member) => {
    setSelectedMembers(selectedMembers.filter((m) => m !== member));
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
          <Button
            variant="contained"
            onClick={handleAddMember}
            disabled={!searchTerm}
          >
            Add
          </Button>
          {selectedMembers.length > 0 && (
            <Box sx={{ marginTop: "1rem" }}>
              <Typography variant="subtitle1">Selected Members:</Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginTop: "0.5rem",
                }}
              >
                {selectedMembers.map((member, index) => (
                  <Chip
                    key={index}
                    label={member}
                    onDelete={() => handleRemoveMember(member)}
                    color="primary"
                  />
                ))}
              </Box>
            </Box>
          )}
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
