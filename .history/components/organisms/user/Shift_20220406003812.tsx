import React from "react";
import dayjs from "dayjs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { createMedia } from "@artsy/fresnel";
import { useDeleteShift } from "../../../hooks/teacher/deleteShift/useDeleteShift";
import Title from "../../atoms/Title";
import DateRangePicker from "../../atoms/Date/Date ";
import DeleteButton from "../../atoms/Button/DeleteButton";
import AlertComponent from "../../atoms/Alert";
import {
  useShiftList_today,
  useShiftList_newDate,
} from "../../../hooks/teacher/reserves/useFreeSpace";
import { useDate } from "../../../hooks/date/useDate";
// Create Media
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 450,
    lg: 990,
    xl: 1200,
  },
});

export default function Shifts() {
  console.log("シフト確認");
  const { freeSpaces, error, loadFreeListError } = useShiftList_today();
  const { loadFreeSpace_newValue, err } = useShiftList_newDate();
  const { changeDateValue, dateValue, newDateTime } = useDate();
  const { deleteShift } = useDeleteShift();
  return (
    <React.Fragment>
      <MediaContextProvider>
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
                let date = new Date(y, m, d, 12, 0, 0);
                loadFreeSpace_newValue(date);
              }}
            />
          </Box>
          <Table size="small">
            <TableHead style={{ backgroundColor: "#FFFFDD" }}>
              <TableRow>
                <Media greaterThan="sm">
                  <TableCell style={{ fontWeight: 600, width: "25%" }}>
                    <Box>講師名</Box>
                  </TableCell>
                </Media>
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
                    <Media greaterThan="sm">
                      <TableCell style={{ width: "25%", height: 50 }}>
                        <Box mt={1.2}>{rsv.teacher}</Box>
                      </TableCell>
                    </Media>
                    <TableCell>
                      {dayjs(rsv.date.toDate()).format("YYYY/MM/DD ")}
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" height={35}>
                        {`${rsv.time}:00`}
                        <Media greaterThan="sm">
                          {rsv.reserved == false && (
                            <DeleteButton
                              onClickEvent={(e) => {
                                deleteShift(
                                  e,
                                  loadFreeSpace_newValue(newDateTime),
                                  rsv.id
                                );
                              }}
                            />
                          )}
                        </Media>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {rsv.student === "" ? "未予約" : "予約済み"}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </>
        {err && err == true ? (
          <AlertComponent>提出済みのシフトはありません</AlertComponent>
        ) : (
          error &&
          error == true && (
            <AlertComponent>提出済みのシフトはありません</AlertComponent>
          )
        )}
        {loadFreeListError && loadFreeListError == true && (
          <AlertComponent>予約情報の取得に失敗しました</AlertComponent>
        )}
      </MediaContextProvider>
    </React.Fragment>
  );
}
