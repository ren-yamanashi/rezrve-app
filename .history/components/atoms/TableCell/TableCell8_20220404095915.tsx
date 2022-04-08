import { blue, grey, teal } from "@mui/material/colors";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import RectangleIcon from "@mui/icons-material/Rectangle";
import CloseIcon from "@mui/icons-material/Close";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const TableCellComponent8 = (props) => {
  return (
    <>
      <TableCell
        sx={{
          borderStyle: "dashed",
          borderWidth: "1px",
          cursor: "pointer",
          height: 50,
          bgcolor: grey[300],
        }}
        onClick={props.clickEvent}
      >
        {props.rsv.map(
          (item) =>
            props.teacherName == item.teacher &&
            (item.student !== "" ? (
              <Tooltip
                title={
                  <>
                    <Box>{`講師名:${item.teacher}`}</Box>
                    <Box>{`生徒名:${item.student}`}</Box>
                    <Box>{`レッスン日時:${dayjs(item.date.toDate()).format(
                      "YYYY/MM/DD "
                    )} ${item.time}:00~`}</Box>
                  </>
                }
              >
                <Box
                  ml={4}
                  width={30}
                  height={30}
                  display="flex"
                  justifyContent="center"
                  borderRadius={2}
                  bgcolor={grey[600]}
                >
                  <CloseIcon
                    sx={{
                      color: "white",
                      fontSize: 12,
                      my: "auto",
                    }}
                  />
                </Box>
              </Tooltip>
            ) : (
              <Tooltip
                title={
                  <>
                    <Box>クリックして予約</Box>
                    <Box>{`レッスン日時:${dayjs(item.date.toDate()).format(
                      "YYYY/MM/DD "
                    )} ${item.time}:00~`}</Box>
                  </>
                }
              >
                <Box
                  ml={4}
                  width={30}
                  height={30}
                  display="flex"
                  justifyContent="center"
                  borderRadius={2}
                  bgcolor={blue[500]}
                >
                  <RadioButtonUncheckedIcon
                    sx={{
                      color: "white",
                      fontSize: 12,
                      my: "auto",
                    }}
                  />
                </Box>
              </Tooltip>
            ))
        )}
      </TableCell>
    </>
  );
};
export default TableCellComponent8;
