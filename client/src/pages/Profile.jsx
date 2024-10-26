import React, { useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Stack,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import moment from "moment";
import { primaryColor } from "../constants/colors";
const ProfilePage = () => {
  let name = "Istiak Ahammad";
  let username = "istiakahammad";
  let bio =
    "Full Stack Developer passionate about building web apps and exploring new technologies.";
  let avatar =
    "https://avatars.githubusercontent.com/u/65768155?s=400&u=a098e6dfa916a2de76f450576042553f1aa6dfa6&v=4";

  let joinDate = moment("2024-10-23T12:55:43.620Z").format("MMMM Do YYYY");
  let uploadedMedia = [
    "https://cdn.ostad.app/public/upload/2023-11-19T14-54-37.471Z-C%20(8).png",
    "https://cdn.ostad.app/public/upload/2023-11-19T14-54-37.471Z-C%20(8).png",
    "https://cdn.ostad.app/public/upload/2023-11-19T14-54-37.471Z-C%20(8).png",
    "https://cdn.ostad.app/public/upload/2023-11-19T14-54-37.471Z-C%20(8).png",
    "https://cdn.ostad.app/public/upload/2023-11-19T14-54-37.471Z-C%20(8).png",
    "https://cdn.ostad.app/public/upload/2023-11-19T14-54-37.471Z-C%20(8).png",
    "https://cdn.ostad.app/public/upload/2023-11-19T14-54-37.471Z-C%20(8).png",
    "https://cdn.ostad.app/public/upload/2023-11-19T14-54-37.471Z-C%20(8).png",
  ];

  const navigate = useNavigate(); // Hook for navigation (from react-router-dom)

  // State for editing the profile
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState(bio);
  const [editedName, setEditedName] = useState(name);
  const [selectedAvatar, setSelectedAvatar] = useState(avatar);

  // Handle profile save
  const handleSaveProfile = () => {
    setIsEditing(false);

    console.log("Profile saved:", { editedName, editedBio, selectedAvatar });
  };

  // Handle avatar selection
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <Box
        sx={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "2rem",
          borderRadius: "15px",
          backgroundColor: "background.paper",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          color: "text.primary",
        }}
      >
        {/* Go Back Button */}
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            color: primaryColor,
            marginBottom: "1.5rem",
            alignSelf: "flex-start",
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        {/* Avatar Section */}
        <Stack alignItems="center" spacing={2}>
          <Avatar
            src={selectedAvatar}
            alt={name}
            sx={{
              width: 120,
              height: 120,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              marginBottom: "1rem",
            }}
          />

          {isEditing && (
            <Button
              variant="outlined"
              component="label"
              startIcon={<PhotoCameraIcon />}
              sx={{ marginBottom: "1rem" }}
            >
              Change Avatar
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleAvatarChange}
              />
            </Button>
          )}

          {isEditing ? (
            <TextField
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              variant="outlined"
              label="Name"
              fullWidth
              sx={{
                maxWidth: "400px",
                borderColor: primaryColor, // Custom border color
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: primaryColor, // Border color when not focused
                  },
                  "&:hover fieldset": {
                    borderColor: primaryColor, // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: primaryColor, // Border color when focused
                  },
                },
                "& .MuiInputBase-input": {
                  color: "text.primary", // Text color for input
                },
              }}
            />
          ) : (
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {editedName}
            </Typography>
          )}

          <Typography
            variant="body1"
            sx={{ fontSize: "0.9rem", color: "text.secondary" }}
          >
            @{username}
          </Typography>
        </Stack>

        {/* Bio Section */}
        <Box sx={{ marginTop: "1rem" }}>
          {isEditing ? (
            <TextField
              value={editedBio}
              onChange={(e) => setEditedBio(e.target.value)}
              variant="outlined"
              label="Bio"
              multiline
              fullWidth
              sx={{
                marginBottom: "1rem",
                borderColor: primaryColor, // Custom border color
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: primaryColor, // Border color when not focused
                  },
                  "&:hover fieldset": {
                    borderColor: primaryColor, // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: primaryColor, // Border color when focused
                  },
                },
                "& .MuiInputBase-input": {
                  color: "text.primary", // Text color for input
                },
              }}
            />
          ) : (
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                fontSize: "1rem",
                color: "text.primary",
                marginBottom: "1rem",
              }}
            >
              {editedBio}
            </Typography>
          )}
        </Box>

        {/* Media and Join Date */}
        <Stack
          direction="row"
          justifyContent="center"
          spacing={3}
          sx={{ marginTop: "1.5rem" }}
        >
          <Box display="flex" alignItems="center" sx={{ color: primaryColor }}>
            <PhotoLibraryIcon sx={{ marginRight: "0.5rem" }} />
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              {uploadedMedia.length} Media
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" sx={{ color: primaryColor }}>
            <CalendarTodayIcon sx={{ marginRight: "0.5rem" }} />
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              Joined {joinDate}
            </Typography>
          </Box>
        </Stack>

        {/* Uploaded Media Section */}
        <Box sx={{ marginTop: "2rem" }}>
          <Typography
            variant="h6"
            sx={{ marginBottom: "1rem", fontWeight: "bold" }}
          >
            Uploaded Media
          </Typography>

          <Grid
            container
            spacing={2}
            height={uploadedMedia.length > 3 ? "200px" : "auto"}
            overflow={"auto"}
          >
            {uploadedMedia && uploadedMedia.length > 0 ? (
              uploadedMedia.map((media, index) => (
                <Grid size={{ xs: 6, sm: 4 }} key={index}>
                  <img
                    src={media}
                    alt={`media-${index}`}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                </Grid>
              ))
            ) : (
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                No media uploaded yet.
              </Typography>
            )}
          </Grid>
        </Box>

        {/* Edit or Save Button */}
        <Button
          variant="contained"
          color="primary"
          startIcon={isEditing ? <EditIcon /> : <EditIcon />}
          onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
          sx={{
            marginTop: "2rem",
            backgroundColor: primaryColor,
            "&:hover": {
              backgroundColor: "#5a1e6e",
            },
            padding: "0.5rem 2rem",
            borderRadius: "25px",
          }}
        >
          {isEditing ? "Save Profile" : "Edit Profile"}
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePage;
