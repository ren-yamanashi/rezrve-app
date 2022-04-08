import { grey } from "@mui/material/colors";
import TableCell from "@mui/material/TableCell";
const TableCellComponent = (props) => {
  <TableCell
    sx={{
      bgcolor: grey[300],
      cursor: "pointer",
      borderStyle: "dashed",
      borderWidth: "1px",
      height: 50,
    }}
    onClick={() => {
      setOpen(true);
      setAge(10);
    }}
  />;
};
