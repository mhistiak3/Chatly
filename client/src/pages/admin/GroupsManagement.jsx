import { Avatar, Container, Typography } from "@mui/material";
import { AdminLayout } from "../../components";
import Table from "../../components/admins/Table";
import { sampleGroup } from "../../constants/smaple.data";
import AvatarCard from "../../components/partials/AvatarCard";

const GroupsManagement = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 130,
      renderCell: (params) => {
        return <Avatar alt={params.row.name} src={params.row.avatar} />;
      },
    },

    {
      field: "totalMembers",
      headerName: "Total Members",
      type: "number",
      width: 150,
      renderCell: (params) => (
        <Typography sx={{ textAlign: "center" }}>
          {params.row.members.length}
        </Typography>
      ),
    },
    {
      field: "members",
      headerName: "Members",
      type: "number",
      width: 200,
      renderCell: (params) => (
        <AvatarCard
          avatar={params.row.members.map((m) => m.avatar)}
          groupChat={true}
        />
      ),
    },
    {
      field: "onwerName",
      headerName: "Created By",
      width: 150,
      renderCell: (params) => (
        <Avatar
          src={
            params.row.members.find((m) => {
              return m.id === params.row.admin;
            }).avatar
          }
        />
      ),
    },
  ];
  return (
    <AdminLayout>
      <Container sx={{ padding: "3rem 0.5rem " }}>
        <Typography variant="h4" sx={{ textAlign: "center", margin: "1rem 0" }}>
          ALL GROUPS
        </Typography>
        <Table rows={sampleGroup} columns={columns} />
      </Container>
    </AdminLayout>
  );
};
export default GroupsManagement;
