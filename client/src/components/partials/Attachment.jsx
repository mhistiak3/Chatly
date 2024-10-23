import { Box, IconButton } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"; // For file icon

const Attachment = ({ url }) => {
  // Function to determine the file type based on the URL or extension
  const getFileType = (url) => {
    const extension = url.split(".").pop().toLowerCase();
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
    const videoExtensions = ["mp4", "webm", "ogg"];
    const audioExtensions = ["mp3", "wav", "ogg"];

    if (imageExtensions.includes(extension)) return "image";
    if (videoExtensions.includes(extension)) return "video";
    if (audioExtensions.includes(extension)) return "audio";
    return "file"; // Default to file if not recognized
  };

  const fileType = getFileType(url);

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {fileType === "image" && (
        <Box
          component="img"
          src={url}
          alt="attachment"
          sx={{
            width: "100%",
            height: "auto",
            borderRadius: "8px",
            marginBottom: "0.5rem",
          }}
        />
      )}
      {fileType === "video" && (
        <Box
          component="video"
          controls
          src={url}
          alt="video attachment"
          sx={{
            width: "100%",
            height: "auto",
            borderRadius: "8px",
            marginBottom: "0.5rem",
          }}
        />
      )}
      {fileType === "audio" && (
        <Box
          component="audio"
          controls
          src={url}
          alt="audio attachment"
          sx={{
            width: "100%",
            height: "auto",
            borderRadius: "8px",
            marginBottom: "0.5rem",
          }}
        />
      )}
      {fileType === "file" && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            padding: "1rem",
            backgroundColor: "#f5f5f5",
            marginBottom: "0.5rem",
            color: "#555",
          }}
        >
          <InsertDriveFileIcon fontSize="large" />
          <Box sx={{ marginLeft: "0.5rem" }}>Download file</Box>
        </Box>
      )}
    </a>
  );
};

export default Attachment;
