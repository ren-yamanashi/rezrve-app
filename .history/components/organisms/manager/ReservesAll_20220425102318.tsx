import React, { useEffect } from "react";
import dayjs from "dayjs";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Box from "@mui/material/Box";
import { ToastContainer } from "react-toastify";
// import my File
import AlertComponent from "../../atoms/Alert/Alert";
import SelectTeacherModal from "../../templates/Modal/SelectTeacherModal";
import Loading from "../../atoms/loading/loadingComponent";
import RsvModal from "../../templates/Modal/RsvModal";
import { useStaffList } from "../../../hooks/firebase/user/useUserList";
import { useHandle } from "../../../hooks/useHandle";
import { useDeleteShift } from "../../../hooks/firebase/manager/useDeleteRsv";
import { useReserves_Week } from "../../../hooks/firebase/manager/useReserves";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
import { useAuth } from "../../../hooks/firebase/useUserAuth";
import { useLoading } from "../../../hooks/useLoading";
import { useSelectUser_query } from "../../../hooks/firebase/user/useUserList";
// 1週間の予約
const ReservesAll = () => {
  const { rsvData, selectRsv } = useSelectReserve();
  const { user } = useAuth();
  const { user_query, loadUser_query } = useSelectUser_query();
  const { handleOpen7, handleOpen4 } = useHandle();
  const { usersList } = useStaffList();
  const { chancelRsv } = useDeleteShift();
  const { rsv_week, error2, loadRsv } = useReserves_Week();
  const { startLoading, completeLoading, loading } = useLoading();
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    loadUser_query(user?.uid);
    startLoading;
    loadRsv(user_query?.companyId).then(() =>
      setTimeout(() => completeLoading(), 500)
    );
  }, [process.browser, user]);

  return (
    <React.Fragment>
      {loading == true ? (
        <Loading />
      ) : (
        <>
          <Table size="small" sx={{ mt: 5 }}>
            <TableHead style={{ backgroundColor: "#FFFFDD" }}>
              <TableRow>
                <TableCell style={{ fontWeight: 600 }}>
                  <Box>
                    担当者名
                    <IconButton onClick={handleOpen7}>
                      <FilterListIcon />
                    </IconButton>
                    <IconButton onClick={() => loadRsv(user_query?.companyId)}>
                      <RestartAltIcon />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell style={{ fontWeight: 600 }}>
                  <Box>顧客名</Box>
                </TableCell>
                <TableCell style={{ fontWeight: 600 }}>
                  <Box>予約日時</Box>
                </TableCell>
                <TableCell style={{ fontWeight: 600 }}>時間</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rsv_week &&
                rsv_week.map((rsv) => (
                  <TableRow key={rsv.id}>
                    <TableCell>{rsv.staff}</TableCell>
                    <TableCell>{rsv.person}</TableCell>
                    <TableCell>
                      {dayjs(rsv.date.toDate()).format("YYYY/MM/DD ")}
                    </TableCell>
                    <TableCell>
                      {`${rsv.time}:00`}
                      <Tooltip title="詳細確認・キャンセル" arrow>
                        <IconButton
                          onClick={() => {
                            handleOpen4();
                            selectRsv(rsv);
                          }}
                        >
                          <EditIcon sx={{ color: "teal", ml: 3 }} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {error2 && error2 == true && (
            <AlertComponent>予約は見つかりませんでした</AlertComponent>
          )}
        </>
      )}
      {/* モーダル　予約内容詳細 */}
      <RsvModal
        date={rsvData.date}
        teacher={rsvData.teacher}
        student={rsvData.rsvStudent}
        email={rsvData.email}
        phoneNumber={rsvData.phoneNumber}
        reserver={rsvData.reserver}
        chancelRsv={(e) =>
          chancelRsv(e, rsvData.id, loadRsv(user_query?.companyId))
        }
      />
      {/* 講師選択 */}
      <SelectTeacherModal users={usersList && usersList} />
      <ToastContainer />
    </React.Fragment>
  );
};

export default ReservesAll;
