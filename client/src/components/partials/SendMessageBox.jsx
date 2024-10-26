import { Box, IconButton, TextField,  } from "@mui/material";
import { memo, useState } from "react"
import Grid from "@mui/material/Grid2";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import {
  PhotoCamera,
  VideoLibrary as VideoCamera,
  AudioFile,
  FileCopy,
} from "@mui/icons-material";
import { primaryColor } from "../../constants/colors";
export const SendMessageBox = memo(
  ({
    handleUploadClick,
    handleFileChange,
    message,
    setMessage,
    handleSendMessage,
  }) => {
    const [showUploadOptions, setShowUploadOptions] = useState(false);
    return (
      <>
        <Box
          sx={{
            padding: "0.5rem",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#1f1f1f",
          }}
        >
          <IconButton
            onClick={() => setShowUploadOptions(!showUploadOptions)}
            sx={{ color: primaryColor }}
          >
            <AttachFileIcon />
          </IconButton>

          {showUploadOptions && (
            <Box
              sx={{
                position: "absolute",
                bottom: "70px",
                left: "10px",
                background: "#121212",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                borderRadius: "8px",
                zIndex: 10,
                padding: "0.5rem",
                width: "80px",
              }}
            >
              <Grid container spacing={1}>
                {/* Image Upload */}
                <Grid size={12}>
                  <IconButton
                    sx={{ color: primaryColor }}
                    onClick={() => handleUploadClick("image")}
                  >
                    <PhotoCamera />
                  </IconButton>
                  <TextField
                    id="image"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileChange(e.target.files[0])}
                  />
                </Grid>
                {/* Video Upload */}
                <Grid size={12}>
                  <IconButton
                    sx={{ color: primaryColor }}
                    onClick={() => handleUploadClick("video")}
                  >
                    <VideoCamera />
                  </IconButton>
                  <TextField
                    id="video"
                    type="file"
                    accept="video/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileChange(e.target.files[0])}
                  />
                </Grid>
                {/* Audio Upload */}
                <Grid size={12}>
                  <IconButton
                    sx={{ color: primaryColor }}
                    onClick={() => handleUploadClick("audio")}
                  >
                    <AudioFile />
                  </IconButton>
                  <TextField
                    id="audio"
                    type="file"
                    accept="audio/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileChange(e.target.files[0])}
                  />
                </Grid>
                {/* File Upload */}
                <Grid size={12}>
                  <IconButton
                    sx={{ color: primaryColor }}
                    onClick={() => handleUploadClick("file")}
                  >
                    <FileCopy />
                  </IconButton>
                  <TextField
                    id="file"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileChange(e.target.files[0])}
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="outlined"
            placeholder="Type a message..."
            fullWidth
            sx={{
              marginLeft: "0.5rem",
              backgroundColor: "#121212",
              borderRadius: "10px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
              },
            }}
          />
          <IconButton onClick={handleSendMessage} sx={{ color: primaryColor }}>
            <SendIcon />
          </IconButton>
        </Box>
      </>
    );
  }
);
