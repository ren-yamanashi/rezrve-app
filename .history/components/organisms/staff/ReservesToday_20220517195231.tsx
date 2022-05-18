import * as React from "react";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { createMedia } from "@artsy/fresnel";
import { ToastContainer } from "react-toastify";
// import in my File
import { useReserves_Today } from "../../../hooks/firebase/teacher/useReserves";
import { reserveProps } from "../../../models/reserveProps";
import { format } from "date-fns";
import Title from "../../atoms/Text/PrimaryTitle";
import CardComponent from "../../atoms/Card/CardComponent";
import ButtonComponent from "../../atoms/Button/Button";
import Alert from "../../atoms/Alert/Alert";
// Create Media
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 700,
    lg: 990,
    xl: 1200,
  },
});
// 今日の予約
const ReserveToday: React.FC<{ reserves_true: reserveProps[] }> = ({
  reserves_true,
}) => {
  console.log(format(new Date(), "yyyy-MM-dd"));
  return (
    <React.Fragment>
      <MediaContextProvider>
        <Box>
          <CardComponent>
            <Box>
              <Media greaterThan="sm">
                <Box display="flex" mb={3}>
                  <Title>今日の予約</Title>
                  <Grid item xs={7} md={6}>
                    <Box ml={3} alignItems="center">
                      <ButtonComponent>
                        <DoubleArrowIcon />
                        予約一覧へ
                      </ButtonComponent>
                    </Box>
                  </Grid>
                </Box>
              </Media>
              <Media at="sm">
                <Box display="flex" mb={3}>
                  <Title>今日の予約</Title>
                </Box>
              </Media>
              <Grid item sm={20}>
                {/* res PC */}
                <Media greaterThan="sm">
                  <Table size="small">
                    <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                      <TableRow>
                        <TableCell style={{ fontWeight: 600 }}>
                          担当者名
                        </TableCell>
                        <TableCell style={{ fontWeight: 600 }}>
                          顧客名
                        </TableCell>
                        <TableCell style={{ fontWeight: 600 }}>
                          予約日時
                        </TableCell>
                        <TableCell style={{ fontWeight: 600 }}>時間</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {!reserves_true || reserves_true.length == 0 ? (
                        <Alert>予約は見つかりませんでした</Alert>
                      ) : (
                        reserves_true.map((rsv) => (
                          <>
                            {format(new Date(), "yyyy-MM-dd") ==
                              format(new Date(rsv.date), "yyyy-MM-dd") && (
                              <>
                                <TableRow key={rsv.id}>
                                  <TableCell>{rsv.staff}</TableCell>
                                  <TableCell>{rsv.reserver}</TableCell>
                                  <TableCell>
                                    {dayjs(rsv.date).format("YYYY/MM/DD ")}
                                  </TableCell>
                                  <TableCell>{`${rsv.time}:00`}</TableCell>
                                </TableRow>
                              </>
                            )}
                          </>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </Media>
                {/* res Mobile */}
                <Media at="sm">
                  <Table size="small">
                    <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                      <TableRow>
                        <TableCell style={{ fontWeight: 600 }}>
                          顧客名
                        </TableCell>
                        <TableCell style={{ fontWeight: 600 }}>
                          予約日時
                        </TableCell>
                        <TableCell style={{ fontWeight: 600 }}>時間</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {!reserves_true || reserves_true.length == 0 ? (
                        <Alert>予約は見つかりませんでした</Alert>
                      ) : (
                        reserves_true.map((rsv) => (
                          <>
                            <TableRow key={rsv.id}>
                              <TableCell>{rsv.reserver}</TableCell>
                              <TableCell>
                                {dayjs(rsv.date).format("YYYY/MM/DD ")}
                              </TableCell>
                              <TableCell>{`${rsv.time}:00`}</TableCell>
                            </TableRow>
                          </>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </Media>
              </Grid>
            </Box>
          </CardComponent>
        </Box>
      </MediaContextProvider>
      <ToastContainer />
    </React.Fragment>
  );
};

export default ReserveToday;
