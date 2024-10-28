import { Box, Container, Typography } from "@mui/material";
import { AdminLayout } from "../../components";
import Table from "../../components/admins/Table";
import Attachment from "../../components/partials/Attachment";

const sampleChat = [
  {
    id: 1,
    attachments: [
      {
        public_id: "1111",
        url: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg",
      },
      {
        public_id: "111",
        url: "https://cdn.ostad.app/resource/2024-06-01T18-21-22.629Z-JavaScript%20Foundation.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=HS6GNL2AXI5U7JE4M7Q7%2F20241023%2Fsgp1%2Fs3%2Faws4_request&X-Amz-Date=20241023T203543Z&X-Amz-Expires=60&X-Amz-Signature=7272c4576ea1b9554a0ab2f92f3d9f3bfdc4b548760b0de5f5123050fad92ac2&X-Amz-SignedHeaders=host&x-id=GetObject",
      },
    ],
    content: "Hello, how are you?",
    sender: "John Doe",
    receiver: "fdrehgfdg",
    time: "11/1/2023",
    groupChat: true,
  },
  {
    id: 2,
    attachments: [
      
    ],
    content: "Hi, how are you?",
    sender: "John Doe",
    receiver: "fdrehgfdg",
    time: "11/1/2023",
    groupChat: true,
  },
];

const MessagesManagement = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "attachment",
      headerName: "Attachments",
      width:500,
      renderCell: (params) => (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {params.row.attachments && params.row.attachments.length > 0 ? (
            params.row.attachments.map((attachment) => (
              <a href={attachment.url} target="_blank" key={attachment.public_id} style={{width: "150px"}}>
                {" "}
                <Attachment url={attachment.url}  />
              </a>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No Attachments
            </Typography>
          )}
        </Box>
      ),
    },
    { field: "content", headerName: "Content", width: 200 },
    { field: "sender", headerName: "Sent By", width: 150 },
    { field: "receiver", headerName: "Received By", width: 150 },
    { field: "groupChat", headerName: "Group Chat", width: 150 },
    { field: "time", headerName: "Time", width: 150 },
  ];

  return (
    <AdminLayout>
      <Container sx={{ padding: "3rem 0.5rem" }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", marginBottom: "1rem" }}
        >
          All Groups
        </Typography>
        <Table rows={sampleChat} columns={columns} rowHeight={100} />
      </Container>
    </AdminLayout>
  );
};

export default MessagesManagement;
