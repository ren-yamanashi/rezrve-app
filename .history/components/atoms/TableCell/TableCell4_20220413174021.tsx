import { blue, grey, red } from "@mui/material/colors";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";

const TableCellComponent4 = (props) => {
  const day_arr = ["日", "月", "火", "水", "木", "金", "土"];
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
            props.date.getDay() == 0
              ? red[400]
              : props.date.getDay() == 6 && blue[400]
          }
        >
          {day_arr[props.date.getDay()]}
        </Box>
        <Box justifyContent="center" display="flex">
          {props.date.getDate() == 1 ? (
            <Box
              fontSize={15}
              justifyContent="center"
              display="flex"
              color={
                props.date.getDay() == 0
                  ? red[400]
                  : props.date.getDay() == 6 && blue[400]
              }
            >
              {`${props.date.getMonth() + 1}/${props.date.getDate()}`}
            </Box>
          ) : (
            <Box
              fontSize={15}
              justifyContent="center"
              display="flex"
              color={
                props.date.getDay() == 0
                  ? red[400]
                  : props.date.getDay() == 6 && blue[400]
              }
            >
              {props.date.getDate()}
            </Box>
          )}
        </Box>
      </TableCell>
    </>
  );
};
export default TableCellComponent4;
