import { grey, teal } from "@mui/material/colors";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
const TableCellComponent4 = (props) => {
  return (
    <>
      <TableCell
        style={{
          fontWeight: 400,
          width: "13%",
          borderStyle: "solid none",
          borderWidth: "1px",
          borderColor: grey[400],
        }}
      >
        <Box
          fontSize={10}
          justifyContent="center"
          display="flex"
          color={props.color}
        >
          {props.day_string}
        </Box>
        <Box justifyContent="center" display="flex">
          {props.getDate == props.getDateNumber ? (
            <Box
              fontSize={15}
              justifyContent="center"
              display="flex"
              color={props.color2}
            >
              {props.date_number_endMonth}
            </Box>
          ) : (
            <Box
              fontSize={15}
              justifyContent="center"
              display="flex"
              color={props.color3}
            >
              {props.date_number}
            </Box>
          )}
        </Box>
      </TableCell>
    </>
  );
};
export default TableCellComponent4;
