import React, { useEffect } from "react";
import dayjs from "dayjs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { ToastContainer } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { createMedia } from "@artsy/fresnel";
//import myFile
import { useDeleteFreeSpace } from "../../../hooks/firebase/manager/useShift";
import Title from "../../atoms/Text/PrimaryTitle";
import DateRangePicker from "../../atoms/Date/Date ";
import DeleteButton from "../../atoms/Button/DeleteButton";
import AlertComponent from "../../atoms/Alert/Alert";
import {
  useShiftList_today,
  useShiftList_newDate,
} from "../../../hooks/firebase/teacher/useFreeSpace";
import { useDate } from "../../../hooks/date/useDate";
import { useSelectUser_query } from "../../../hooks/firebase/user/useUserList";
import CreateShiftModal from "../../templates/Modal/CreateShift_manager";
import { useAuth } from "../../../hooks/firebase/useUserAuth";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
import { useCreateShift } from "../../../hooks/firebase/manager/useCreateShift";
import { blue } from "@mui/material/colors";
import { useHandle } from "../../../hooks/useHandle";
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
  const { handleOpen3 } = useHandle();
  const { user } = useAuth();
  const { createShift } = useCreateShift();
  const { freeSpaces, error, loadFreeSpace } = useShiftList_today();
  const { loadFreeSpace_newValue, err } = useShiftList_newDate();
  const { dateValue, newDateTime, chgDate } = useDate();
  const { deleteShift } = useDeleteFreeSpace();
  const { user_query, loadUser_query } = useSelectUser_query();
  const { handleChangeTime, rsvData } = useSelectReserve();
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    loadUser_query(user?.uid);
    loadFreeSpace();
  }, [process.browser, user]);
  return (
    <React.Fragment>
      <MediaContextProvider>
        <>
          <Box ml={3}>
            <Title>提出シフト一覧</Title>
            <Box>
              <IconButton onClick={handleOpen3}>
                <PersonAddAltIcon sx={{ color: blue[500], mr: 2 }} />
                <Box my="auto">
                  <Typography fontSize={14} sx={{ color: blue[500] }}>
                    シフト登録
                  </Typography>
                </Box>
              </IconButton>
            </Box>
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
                <TableCell style={{ fontWeight: 600 }}>担当者名</TableCell>
                <TableCell style={{ fontWeight: 600 }}>日時</TableCell>
                <TableCell style={{ fontWeight: 600 }}>時間</TableCell>
                <TableCell style={{ fontWeight: 600 }}>状態</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {freeSpaces &&
                freeSpaces.map((rsv) => (
                  <TableRow key={rsv.id}>
                    <TableCell style={{ height: 50 }}>{rsv.staff}</TableCell>
                    <TableCell>
                      {dayjs(rsv.date.toDate()).format("YYYY/MM/DD ")}
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" height={35}>
                        {`${rsv.time}:00`}
                        <Media greaterThan="sm">
                          {rsv.reserved == false && (
                            <DeleteButton
                              onClickEvent={(e) => deleteShift(e, rsv.id)}
                            />
                          )}
                        </Media>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {rsv.person === "" ? "未予約" : "予約済み"}
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
        <CreateShiftModal
          staffName={user_query?.userName}
          time={rsvData.time}
          changeSelect={handleChangeTime}
          createShift={(e) => {
            createShift(
              e,
              user_query?.userName,
              rsvData.time,
              user_query?.id,
              user_query.companyId
            ).then(() => loadFreeSpace());
          }}
        />
      </MediaContextProvider>
      <ToastContainer />
    </React.Fragment>
  );
};

export default Shifts;
