import { Box, Stack, Typography, Avatar, IconButton } from "@mui/material";
import { Link } from ".."; // Adjust the Link import as needed
import DeleteIcon from "@mui/icons-material/Delete"; // Example of a delete icon

const ChatItem = ({
  avatar = [1,2,4,2], 
  name = "Istiak Ahammad",
  id,
  lastMessage = "Hello", 
  groupChat ,
  sameSender,
  newMessage,
  handleDeleteCaption,
}) => {
  return (
    <Link to={`/chat/${id}`} style={{ textDecoration: "none", width: "100%" }}>
      <Box
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #333",
          padding: "1rem",
          backgroundColor: sameSender ? "#1f1f1f" : "#121212",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "#333",
          },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          {groupChat ? (
            <Stack direction="row" spacing={-3}>
              {avatar.length > 3 && (
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    backgroundColor: "#555",
                    fontSize: "0.8rem",
                    border: "2px solid #121212",
                    zIndex: 10,
                  }}
                >
                  +{avatar.length - 3}
                </Avatar>
              )}
              {avatar.slice(0, 3).map((img, idx) => (
                <Avatar
                  key={idx}
                  src={img}
                  alt={`avatar-${idx}`}
                  sx={{
                    width: 40,
                    height: 40,
                    border: "2px solid #121212",
                    zIndex: avatar.length - idx,
                    backgroundColor: "#555",
                  }}
                />
              ))}
            </Stack>
          ) : (
            <Avatar
              alt={name}
              src={avatar[0] || ""}
              sx={{
                width: 50,
                height: 50,
                backgroundColor: "#555", // Darker avatar background
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.7)",
              }}
            >
              {!avatar.length && name.charAt(0)}{" "}
              {/* Fallback to first letter */}
            </Avatar>
          )}

          <Stack>
            <Typography
              variant="body1"
              sx={{
                fontWeight: newMessage ? "bold" : "normal",
                color: "#fff",
              }}
            >
              {name}
            </Typography>
            <Typography
              variant="body2"
              color={newMessage ? "#74268c" : "#aaa"}
              sx={{
                fontWeight: newMessage ? "bold" : "normal",
                fontSize: "0.85rem",
              }}
            >
              {newMessage ? lastMessage : lastMessage || "No messages yet"}
            </Typography>
          </Stack>
        </Stack>

        {/* Right Section: Delete Button */}
        {/* <IconButton
          onClick={handleDeleteCaption}
          sx={{
            color: "#74268c",
          }}
        >
          <DeleteIcon />
        </IconButton> */}
      </Box>
    </Link>
  );
};

export default ChatItem;
