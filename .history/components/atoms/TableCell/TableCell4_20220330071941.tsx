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
          color={
            today.getDay() == 0 ? red[400] : today.getDay() == 6 && blue[400]
          }
        >
          {day_arr[today.getDay()]}
        </Box>
        <Box justifyContent="center" display="flex">
          {today.getDate() == 1 ? (
            <Box
              fontSize={15}
              justifyContent="center"
              display="flex"
              color={
                today.getDay() == 0
                  ? red[400]
                  : today.getDay() == 6 && blue[400]
              }
            >{`${today.getMonth() + 1}/${today.getDate()}`}</Box>
          ) : (
            <Box
              fontSize={15}
              justifyContent="center"
              display="flex"
              color={
                today.getDay() == 0
                  ? red[400]
                  : today.getDay() == 6 && blue[400]
              }
            >
              {today.getDate()}
            </Box>
          )}
        </Box>
      </TableCell>
    </>
  );
};
export default TableCellComponent4;
