import { blue, grey, red, teal } from "@mui/material/colors";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import IconButton from "@mui/material/IconButton";
import { useSetData_teachersRsv } from "../../../hooks/student/teachersRsv/useSetData";
import { useHandle } from "../../../hooks/handle/useHandle";
const TableCellComponent8 = (props) => {
  const { setData } = useSetData_teachersRsv();
  const { handleOpen } = useHandle();
  return (
    <>
      <TableCell
        sx={{
          borderStyle: "dashed",
          borderWidth: "1px",
          cursor: "pointer",
          height: 50,
          bgcolor:
            rsv10 &&
            rsv10.map(
              (item) =>
                uu.userName == item.teacher &&
                (item.student !== "" ? teal[300] : blue[200])
            ),
        }}
        onClick={() => {
          rsv10 &&
            rsv10.map((item) => {
              uu.userName == item.teacher && setRsvNum(item.id);
              uu.userName == item.teacher && setTeacher(item.teacher);
              uu.userName == item.teacher && setRsvStudent(item.student);
              uu.userName == item.teacher && setRsvTime(item.time);
              uu.userName == item.teacher &&
                setRsvDate(
                  `${dayjs(item.date.toDate()).format("YYYY/MM/DD ")} ${
                    item.time
                  }:00~`
                );
              uu.userName == item.teacher &&
                (item.student !== "" ? handleOpen4() : handleOpen());
            });
        }}
      >
        {rsv10 &&
          rsv10.map(
            (item) =>
              uu.userName == item.teacher &&
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
                  <Button
                    sx={{
                      bgcolor: teal[300],
                      boxShadow: "none",
                      height: 30,
                      "&:hover": { bgcolor: teal[300] },
                    }}
                    fullWidth
                  />
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
                  <Button
                    sx={{
                      bgcolor: blue[200],
                      boxShadow: "none",
                      height: 30,
                      "&:hover": { bgcolor: blue[200] },
                    }}
                    fullWidth
                  />
                </Tooltip>
              ))
          )}
      </TableCell>
    </>
  );
};
export default TableCellComponent8;
