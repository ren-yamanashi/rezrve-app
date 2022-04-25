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
  const { loading, startLoading, completeLoading } = useLoading();
  const { rsv, error2, loadRsv } = useReserves_Week();
  const { error3 } = useReserves_student();
  const { user } = useAuth();
  React.useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    startLoading;
    loadRsv().then(() => setTimeout(() => completeLoading(), 500));
  }, [process.browser, user]);
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
                  {rsv &&
                    rsv.map((rsv) => (
                      <TableRow key={rsv.id}>
                        <TableCell>{rsv.staff}</TableCell>
                        <TableCell>{rsv.person}</TableCell>
                        <TableCell>
                          {dayjs(rsv.date.toDate()).format("YYYY/MM/DD ")}
                        </TableCell>
                        <TableCell>
                          <Box display={"flex"}>
                            {`${rsv.time}:00`}
                            <EditButton tooltipText={"予約詳細/キャンセル"} />
                          </Box>
                        </TableCell>
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
      )}
      <ToastContainer />
    </React.Fragment>
  );
};

export default Reserves;
