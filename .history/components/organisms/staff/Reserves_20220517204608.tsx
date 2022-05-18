import * as React from "react";
import dayjs from "dayjs";
import { ToastContainer } from "react-toastify";
import { createMedia } from "@artsy/fresnel";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
// Import my file
import Alert from "../../atoms/Alert/Alert";
import RsvModal from "../../templates/Modal/RsvModal";
import Loading from "../../atoms/loading/loadingComponent";
import EditButton from "../../atoms/Button/EditButton";
import { useAuth } from "../../../hooks/firebase/useUserAuth";
import { useLoading } from "../../../hooks/useLoading";
import { useReserves_Week } from "../../../hooks/firebase/teacher/useReserves";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
import { useHandle } from "../../../hooks/useHandle";
import { reserveProps } from "../../../models/reserveProps";
import { usePrismaReserve } from "../../../hooks/prisma/useReserve";
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
const Reserves: React.FC<{ reserves_week: reserveProps[] }> = ({
  reserves_week,
}) => {
  const { chancelReserve } = usePrismaReserve();
  const { selectRsv, rsvData } = useSelectReserve();
  const { loading } = useLoading();
  const { reserve } = useReserves_Week();
  const { user } = useAuth();
  const { open, handleOpen1, handleClose1 } = useHandle();
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
                  {!reserves_week || reserves_week.length == 0 ? (
                    <Alert>予約が見つかりませんでした</Alert>
                  ) : (
                    reserves_week.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell>{r.staff}</TableCell>
                        <TableCell>{r.reserver}</TableCell>
                        <TableCell>
                          {dayjs(r.date).format("YYYY/MM/DD ")}
                        </TableCell>
                        <TableCell>
                          <Box display={"flex"}>
                            {`${r.time}:00`}
                            <EditButton
                              tooltipText={"予約詳細確認・キャンセル"}
                              onClickEvent={() => {
                                handleOpen1();
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
        open={open.open1}
        handleClose={handleClose1}
        date={rsvData.date}
        teacher={user && user.displayName}
        student={rsvData.rsvStudent}
        email={rsvData.email}
        phoneNumber={rsvData.phoneNumber}
        reserver={rsvData.reserver}
        chancelRsv={() => {
          chancelReserve(rsvData.id);
          handleClose1();
        }}
      />
      <ToastContainer />
    </React.Fragment>
  );
};

export default Reserves;
