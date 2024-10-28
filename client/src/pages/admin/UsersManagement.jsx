import { Avatar, Container, Typography } from "@mui/material"
import { AdminLayout } from "../../components"
import Table from "../../components/admins/Table"
import { smapleUsers } from "../../constants/smaple.data"

const UsersManagement = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 130,
      renderCell: (params) => (
        <Avatar alt={params.row.name} src={params.value} />
      ),
    },
    { field: "username", headerName: "Username", width: 200 },
    {
      field: "friends",
      headerName: "Friends",
      type: "number",
      width: 100,
      renderCell: (params) => <Typography>{params.value.length}</Typography>,
    },
    {
      field: "groups",
      headerName: "Groups",
      type: "number",
      width: 100,
      renderCell: (params) => <Typography>{params.value.length}</Typography>,
    },
  ];
  return (
    <AdminLayout>
      <Container sx={{ padding: "3rem 0.5rem " }}>
        <Typography variant="h4" sx={{ textAlign: "center", margin: "1rem 0" }}>
          ALL USERS
        </Typography>
        <Table rows={smapleUsers} columns={columns} />
      </Container>
    </AdminLayout>
  );
}
export default UsersManagement