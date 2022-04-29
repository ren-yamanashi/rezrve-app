import * as React from "react";
import dayjs from "dayjs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { createMedia } from "@artsy/fresnel";
// Import in my file
import {
  useReserves_Week,
  useReserves_student,
} from "../../../hooks/firebase/teacher/useReserves";
import { ToastContainer } from "react-toastify";
import Alert from "../../atoms/Alert/Alert";
import { useAuth } from "../../../hooks/firebase/useUserAuth";
import { useLoading } from "../../../hooks/useLoading";
import Loading from "../../atoms/loading/loadingComponent";
import EditButton from "../../atoms/Button/EditButton";
import { Box } from "@mui/system";
import RsvModal from "../../templates/Modal/RsvModal";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
import { useChancelRsv } from "../../../hooks/firebase/manager/useReserves";
import { useHandle } from "../../../hooks/useHandle";
// Create media
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});
// 1週間の予約
const Reserves = () => {
  const { chancelRsv } = useChancelRsv();
  const { handleOpen4, handleClose4 } = useHandle();
  const { selectRsv, rsvData } = useSelectReserve();
  const { loading, startLoading, completeLoading } = useLoading();
  const { reserve, loadRsv } = useReserves_Week();
  const { error3 } = useReserves_student();
  const { user } = useAuth();
  return (
    <React.Fragment>
      {loading == true ? (
        <Loading />
      ) : (
        <MediaContextProvider>
          <Media greaterThan="sm">
            <>
              <Table size="small">
                <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                  <TableRow>
                    <TableCell style={{ fontWeight: 600 }}>担当者名</TableCell>
                    <TableCell style={{ fontWeight: 600 }}>顧客名</TableCell>
                    <TableCell style={{ fontWeight: 600 }}>予約日時</TableCell>
                    <TableCell style={{ fontWeight: 600 }}>時間</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!reserve || reserve.length == 0 ? (
                    <Alert>予約が見つかりませんでした</Alert>
                  ) : (
                    reserve.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell>{r.staff}</TableCell>
                        <TableCell>{r.person}</TableCell>
                        <TableCell>
                          {dayjs(r.date.toDate()).format("YYYY/MM/DD ")}
                        </TableCell>
                        <TableCell>
                          <Box display={"flex"}>
                            {`${r.time}:00`}
                            <EditButton
                              tooltipText={"予約詳細確認・キャンセル"}
                              onClickEvent={() => {
                                handleOpen4();
                                selectRsv(r);
                              }}
                            />
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </>
          </Media>
          {/* res Phone */}
          <Media at="sm">
            <>
              <Table size="small">
                <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                  <TableRow>
                    <TableCell style={{ fontWeight: 600, fontSize: "13px" }}>
                      顧客名
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, fontSize: "13px" }}>
                      予約日時
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, fontSize: "13px" }}>
                      時間
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!reserve || reserve.length == 0 ? (
                    <Alert>予約が見つかりませんでした</Alert>
                  ) : (
                    reserve.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell sx={{ fontSize: "10px" }}>
                          {r.student}
                        </TableCell>
                        <TableCell sx={{ fontSize: "10px" }}>
                          {dayjs(r.date.toDate()).format("YYYY/MM/DD ")}
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: "10px" }}
                        >{`${r.time}:00`}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </>
          </Media>
        </MediaContextProvider>
      )}
      <RsvModal
        date={rsvData.date}
        teacher={user && user.displayName}
        student={rsvData.rsvStudent}
        email={rsvData.email}
        phoneNumber={rsvData.phoneNumber}
        reserver={rsvData.reserver}
        chancelRsv={(e) => chancelRsv(e, rsvData.id)}
      />
      <ToastContainer />
    </React.Fragment>
  );
};

export default Reserves;
