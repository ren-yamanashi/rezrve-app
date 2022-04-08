import { grey } from "@mui/material/colors";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
const TableCellComponent = (props) => {
  return (
    <>
      <Tooltip title="シフトを申請" arrow>
        <TableCell
          sx={{
            bgcolor: grey[300],
            cursor: "pointer",
            borderStyle: "dashed",
            borderWidth: "1px",
            height: 50,
          }}
          onClick={props.click}
        />
      </Tooltip>
    </>
  );
};
export default TableCellComponent;
