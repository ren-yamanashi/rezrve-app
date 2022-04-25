import React, { useState } from "react";
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
import { useSearchStudent } from "../../../hooks/firebase/user/useUserList";
import { useUserList } from "../../../hooks/firebase/user/useUserList";
import { ToastContainer } from "react-toastify";
import SelectStudentModal from "../../templates/Modal/SelectStudentModal";
import Alert from "../../atoms/Alert/Alert";
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
  const { rsv, error2 } = useReserves_Week();
  const { error3 } = useReserves_student();
  const { usersList } = useUserList();
  const { loadSearchStudent } = useSearchStudent();
  const [sortStudent, setSortStudent] = useState<string>("");
  return (
    <React.Fragment>
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
                {rsv &&
                  rsv.map((rsv) => (
                    <TableRow key={rsv.id}>
                      <TableCell>{rsv.staff}</TableCell>
                      <TableCell>{rsv.person}</TableCell>
                      <TableCell>
                        {dayjs(rsv.date.toDate()).format("YYYY/MM/DD ")}
                      </TableCell>
                      <TableCell>{`${rsv.time}:00`}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {error2 && error2 == true ? (
              <Alert>予約が見つかりませんでした</Alert>
            ) : (
              error3 &&
              error3 == true && <Alert>予約が見つかりませんでした</Alert>
            )}
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
                {rsv.map((rsv) => (
                  <TableRow key={rsv.id}>
                    <TableCell sx={{ fontSize: "10px" }}>
                      {rsv.student}
                    </TableCell>
                    <TableCell sx={{ fontSize: "10px" }}>
                      {dayjs(rsv.date.toDate()).format("YYYY/MM/DD ")}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: "10px" }}
                    >{`${rsv.time}:00`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {error2 && error2 == true ? (
              <Alert>予約が見つかりませんでした</Alert>
            ) : (
              error3 &&
              error3 == true && <Alert>予約が見つかりませんでした</Alert>
            )}
          </>
        </Media>
      </MediaContextProvider>
      <ToastContainer />
    </React.Fragment>
  );
};

export default Reserves;
