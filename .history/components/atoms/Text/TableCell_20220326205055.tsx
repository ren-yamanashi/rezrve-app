import { grey } from "@mui/material/colors";
import TableCell from "@mui/material/TableCell";
const TableCellComponent = (props) => {
  return (
    <>
      <TableCell
        sx={{
          bgcolor: grey[300],
          cursor: "pointer",
          borderStyle: "dashed",
          borderWidth: "1px",
          height: 50,
        }}
        onClick={props.clickCell}
      />
    </>
  );
};
export default TableCellComponent;
