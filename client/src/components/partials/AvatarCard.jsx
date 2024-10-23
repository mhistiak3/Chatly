import { Avatar, Badge, Stack } from "@mui/material";

const AvatarCard = ({avatar, groupChat,isOnline,name}) => {
  return (
    <>
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
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          sx={{
            "& .MuiBadge-dot": {
              backgroundColor: isOnline ? "green" : "gray",
              width: 12,
              height: 12,
              borderRadius: "50%",
              border: "2px solid #121212",
            },
          }}
        >
          <Avatar
            alt={name}
            src={avatar[0] || ""}
            sx={{
              width: 50,
              height: 50,
              backgroundColor: "#555",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.7)",
            }}
          >
            {!avatar.length && name.charAt(0)}{" "}
          </Avatar>
        </Badge>
      )}
    </>
  );
}
export default AvatarCard