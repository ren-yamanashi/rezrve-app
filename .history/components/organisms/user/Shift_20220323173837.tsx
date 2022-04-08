import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
  getDocs,
  Timestamp,
  startAt,
  endAt,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { browser } from "process";
import React, { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import dayjs from "dayjs";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import DatePicker from "@mui/lab/DatePicker";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { createMedia } from "@artsy/fresnel";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { FreeList } from "../../../models/FreeList";
import { useDeleteShift } from "../../../hooks/teacher/deleteShift/useDeleteShift";
import Title from "../../atoms/Title";
import { blue, teal } from "@mui/material/colors";
import { ja } from "date-fns/locale";
import DateRangePicker from "../../atoms/Date/Date ";
import DeleteButton from "../../atoms/Button/DeleteButton";
import AlertComponent from "../../atoms/Alert";
import {
  useShiftList_today,
  useShiftList_newDate,
} from "../../../hooks/teacher/reserves/useFreeSpace";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 450,
    lg: 990,
    xl: 1200,
  },
});

export default function Shifts() {
  const { freeSpaces, error } = useShiftList_today();
  const { loadFreeSpace_newValue, err } = useShiftList_newDate();
  const { deleteShift } = useDeleteShift();
  const [value, setValue] = useState(new Date());
  const day2 = new Date(value);
  const y2 = day2.getFullYear();
  const m2 = day2.getMonth();
  const d2 = day2.getDate();
  let date = new Date(y2, m2, d2, 12, 0, 0);
  //日付をTimeStamp型にして返す
  const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
  };
  return (
    <React.Fragment>
      <MediaContextProvider>
        <>
          <Box ml={3}>
            <Title>提出シフト一覧</Title>
            <DateRangePicker
              value={value}
              changeDate={(newValue) => {
                setValue(newValue);
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
                                  loadFreeSpace_newValue(date),
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
      </MediaContextProvider>
    </React.Fragment>
  );
}
