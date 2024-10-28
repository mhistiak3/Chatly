import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

export default function Table({
  rows = [],
  paginationModel = { page: 0, pageSize: 10 },
  columns = [],
  rowHeight,
}) {
  return (
    <Paper sx={{ height: "600px", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0, outline: "none" }}
        rowHeight={rowHeight}
      />
    </Paper>
  );
}
