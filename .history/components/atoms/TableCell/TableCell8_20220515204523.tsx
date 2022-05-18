import { blue, grey, teal } from "@mui/material/colors";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useDate } from "../../../hooks/date/useDate";
import { format } from "date-fns";

const TableCellComponent8 = (props) => {
  const { newDateTime } = useDate();
  return (
    <>
      <TableCell
        sx={{
          borderStyle: "dashed",
          borderWidth: "1px",
          cursor: "pointer",
          height: 50,
        }}
        onClick={props.clickEvent}
      >
        {props.rsv.map(
          (item) =>
            format(newDateTime, "yyyy-MM-dd") ==
              format(new Date(item.date), "yyyy-MM-dd") &&
            props.teacherName == item.staff &&
            (item.reserved == true ? (
              <Tooltip
                title={
                  <>
                    <Box>{`講師名:${item.staff}`}</Box>
                    <Box>{`生徒名:${item.reserver}`}</Box>
                    <Box>{`レッスン日時:${dayjs(item.date).format(
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
                  mx="auto"
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
                    <Box>{`レッスン日時:${dayjs(item.date).format(
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
                  mx={"auto"}
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
