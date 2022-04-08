import { grey } from "@mui/material/colors";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
const TableCellComponent2 = (props) => {
  return (
    <>
      <Tooltip
        title={
          <>
            <Box>{`講師名:${props.teacher}`}</Box>
            <Box>{`生徒名:${props.student}`}</Box>
            <Box>{`レッスン日時:${dayjs(props.date.toDate()).format(
              "YYYY/MM/DD "
            )} ${props.time}:00~`}</Box>
          </>
        }
        arrow
      >
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
export default TableCellComponent2;
