import React, { useState } from "react";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { createMedia } from "@artsy/fresnel";
import { ToastContainer } from "react-toastify";
import { blue } from "@mui/material/colors";
// import my File
import PrimaryText from "../../atoms/Text/Typography4";
import Title from "../../atoms/Text/PrimaryTitle";
import CardComponent from "../../atoms/Card/CardComponent";
import EditButton from "../../atoms/Button/EditButton";
import AlertComponent from "../../atoms/Alert/Alert";
import RsvModal from "../../templates/Modal/RsvModal";
import { useReserves_AfterToday } from "../../../hooks/firebase/student/useReserves";
import { useDeleteShift } from "../../../hooks/firebase/student/deleteRsv";
import { useHandle } from "../../../hooks/useHandle";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
// Create Media
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    xs: 0,
    sm: 420,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});
//　予約済みレッスン
const YoyakuListToday = () => {
  const { rsv, error, loadReserves_AfterToday } = useReserves_AfterToday();
  const { handleOpen4 } = useHandle();
  const { chancelRsv } = useDeleteShift();
  const { rsvData, selectRsv } = useSelectReserve();
  return (
    <React.Fragment>
      <MediaContextProvider>
        <Box>
          <CardComponent>
            <Box>
              <Media greaterThan="xs">
                <Box display="flex" mb={3}>
                  <Title>次回予約</Title>
                </Box>
              </Media>
              <Media at="xs">
                <Box display="flex" mb={3}>
                  <PrimaryText
                    size={15}
                    color={blue[600]}
                    style={{ fontWeight: 600 }}
                    textTitle={"次回予約"}
                  />
                </Box>
              </Media>
              <Media greaterThan="xs">
                <Grid item sm={20}>
                  <Table size="small">
                    <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                      <TableRow>
                        <TableCell style={{ fontWeight: 600 }}>
                          担当者名
                        </TableCell>
                        <TableCell style={{ fontWeight: 600 }}>
                          予約日時
                        </TableCell>
                        <TableCell style={{ fontWeight: 600 }}>時間</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rsv &&
                        rsv.map((rsv) => (
                          <TableRow key={rsv.id}>
                            <TableCell>{rsv.teacher}</TableCell>
                            <TableCell>
                              {dayjs(rsv.date.toDate()).format("YYYY/MM/DD ")}
                            </TableCell>
                            <TableCell>
                              {`${rsv.time}:00`}
                              <EditButton
                                tooltipText={"詳細確認・キャンセル"}
                                onClickEvent={() => {
                                  handleOpen4();
                                  selectRsv(rsv);
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  {error && error == true && (
                    <AlertComponent>次回の予約はありません</AlertComponent>
                  )}
                </Grid>
              </Media>
              {/* スマホレスポンシブ　~420 */}
              <Media at="xs">
                <Grid item>
                  <Table size="small">
                    <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                      <TableRow>
                        <TableCell style={{ fontWeight: 600, fontSize: 12 }}>
                          担当者名
                        </TableCell>
                        <TableCell style={{ fontWeight: 600, fontSize: 12 }}>
                          日時
                        </TableCell>
                        <TableCell style={{ fontWeight: 600, fontSize: 12 }}>
                          時間
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rsv &&
                        rsv.map((rsv) => (
                          <TableRow key={rsv.id}>
                            <TableCell style={{ fontSize: 12 }}>
                              {rsv.teacher}
                            </TableCell>
                            <TableCell style={{ fontSize: 12 }}>
                              {dayjs(rsv.date.toDate()).format("MM/DD ")}
                            </TableCell>
                            <TableCell style={{ fontSize: 12 }}>
                              {`${rsv.time}:00`}
                              <EditButton
                                tooltipText={"詳細確認・キャンセル"}
                                onClickEvent={() => {
                                  handleOpen4();
                                  selectRsv(rsv);
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  {error && error == true && (
                    <AlertComponent>次回の予約はありません</AlertComponent>
                  )}
                </Grid>
              </Media>
              {/* モーダル　予約内容詳細 */}
              <RsvModal
                date={rsvData.date}
                teacher={rsvData.teacher}
                student={rsvData.rsvStudent}
                chancelRsv={(e) =>
                  chancelRsv(e, rsvData.id, loadReserves_AfterToday())
                }
              />
            </Box>
          </CardComponent>
        </Box>
      </MediaContextProvider>
      <ToastContainer />
    </React.Fragment>
  );
};

export default YoyakuListToday;
