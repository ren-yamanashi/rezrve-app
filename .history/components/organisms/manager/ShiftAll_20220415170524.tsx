import React from "react";
import dayjs from "dayjs";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Box from "@mui/material/Box";
// import my File
import { useFreeSpace_newValue } from "../../../hooks/firebase/manager/useShift";
import { useTeacherList } from "../../../hooks/firebase/user/useUserList";
import Title from "../../atoms/Text/PrimaryTitle";
import { teal } from "@mui/material/colors";
import { useDate } from "../../../hooks/date/useDate";
import DateRangePicker from "../../atoms/Date/Date ";
import SelectTeacherModal from "../../templates/Modal/SelectTeacherModal";
import { useHandle } from "../../../hooks/useHandle";
import AlertComponent from "../../atoms/Alert/Alert";

const ShiftsAll = () => {
  console.log("シフト一覧　（管理者）");
  const { changeDateValue, dateValue, newDateTime } = useDate();
  const { handleOpen7 } = useHandle();
  const { freeSpaces, loadFreeSpace_newValue, deleteShift, err } =
    useFreeSpace_newValue();
  const { usersList } = useTeacherList();
  return (
    <React.Fragment>
      <>
        <Box ml={3}>
          <Title>提出シフト一覧</Title>
          <DateRangePicker
            value={dateValue}
            changeDate={(newValue) => {
              changeDateValue(newValue);
              const day = new Date(newValue);
              const y = day.getFullYear();
              const m = day.getMonth();
              const d = day.getDate();
              let newDate = new Date(y, m, d, 12, 0, 0);
              loadFreeSpace_newValue(newDate);
            }}
          />
        </Box>
        <Table size="small">
          <TableHead style={{ backgroundColor: "#FFFFDD" }}>
            <TableRow>
              <TableCell style={{ fontWeight: 600 }}>
                <Box>
                  講師名
                  <IconButton onClick={handleOpen7}>
                    <FilterListIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => loadFreeSpace_newValue(newDateTime)}
                  >
                    <RestartAltIcon />
                  </IconButton>
                  <SelectTeacherModal users={usersList && usersList} />
                </Box>
              </TableCell>
              <TableCell style={{ fontWeight: 600 }}>
                <Box>日時</Box>
              </TableCell>
              <TableCell style={{ fontWeight: 600 }}>時間</TableCell>
              <TableCell style={{ fontWeight: 600 }}>状態</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {freeSpaces &&
              freeSpaces.map((rsv) => (
                <TableRow key={rsv.id}>
                  <TableCell>{rsv.teacher}</TableCell>
                  <TableCell>
                    {dayjs(rsv.date.toDate()).format("YYYY/MM/DD ")}
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" height={35}>
                      {`${rsv.time}:00`}
                      {rsv.reserved == false && (
                        <Tooltip title="シフトを閉じる" arrow>
                          <IconButton
                            onClick={(e) => deleteShift(e, rsv.id, newDateTime)}
                          >
                            <DeleteIcon
                              sx={{
                                fontSize: 30,
                                color: teal[500],
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {rsv.student == "" ? "未予約" : "予約済み"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {err == true && (
          <AlertComponent>提出済みのシフトはありません</AlertComponent>
        )}
      </>
    </React.Fragment>
  );
};

export default ShiftsAll;
