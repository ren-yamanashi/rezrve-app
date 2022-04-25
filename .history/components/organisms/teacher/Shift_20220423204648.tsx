import React from "react";
import dayjs from "dayjs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { createMedia } from "@artsy/fresnel";
import { useDeleteShift } from "../../../hooks/firebase/teacher/useDeleteShift";
import Title from "../../atoms/Text/PrimaryTitle";
import DateRangePicker from "../../atoms/Date/Date ";
import DeleteButton from "../../atoms/Button/DeleteButton";
import AlertComponent from "../../atoms/Alert/Alert";
import {
  useShiftList_today,
  useShiftList_newDate,
} from "../../../hooks/firebase/teacher/useFreeSpace";
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
// シフト確認
const Shifts = () => {
  const { freeSpaces, error } = useShiftList_today();
  const { loadFreeSpace_newValue, err } = useShiftList_newDate();
  const { dateValue, newDateTime, chgDate } = useDate();
  const { deleteShift } = useDeleteShift();
  return (
    <React.Fragment>
      <MediaContextProvider>
        <>
          <Box ml={3}>
            <Title>提出シフト一覧</Title>
            <DateRangePicker
              value={dateValue}
              changeDate={(newValue) =>
                loadFreeSpace_newValue(chgDate(newValue))
              }
            />
          </Box>
          <Table size="small">
            <TableHead style={{ backgroundColor: "#FFFFDD" }}>
              <TableRow>
                <Media greaterThan="sm">
                  <TableCell style={{ fontWeight: 600 }}>担当者名</TableCell>
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
                      <TableCell style={{ height: 50 }}>{rsv.staff}</TableCell>
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
          <AlertComponent>シフトの提出はありません</AlertComponent>
        ) : (
          error &&
          error == true && (
            <AlertComponent>シフトの提出はありません</AlertComponent>
          )
        )}
      </MediaContextProvider>
    </React.Fragment>
  );
};

export default Shifts;
