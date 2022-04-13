import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import dayjs from "dayjs";

const TableCellComponent3 = (props) => {
  return (
    <>
      <Tooltip
        title={
          <>
            <Box>クリックして予約</Box>
            <Box>{`レッスン日時:${dayjs(props.date.toDate()).format(
              "YYYY/MM/DD "
            )} ${props.time}:00~`}</Box>
          </>
        }
        arrow
      >
        <TableCell
          key={props.id}
          sx={{
            bgcolor: "white",
            cursor: "pointer",
            borderStyle: "dashed",
            borderWidth: "1px",
            height: 50,
          }}
          onClick={props.click}
        ></TableCell>
      </Tooltip>
    </>
  );
};
export default TableCellComponent3;
