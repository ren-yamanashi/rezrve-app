import React, { useEffect, useState } from "react";
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
//内部インポート
import { useReserves_Today } from "../../hooks/teacher/reserves/useReserves";
import { useAuth } from "../../hooks/useUserAuth";
import Title from "../atoms/Title";
import CardComponent from "../atoms/CardComponent";
import ButtonComponent from "../atoms/Button";
import Alert from "../atoms/Alert";
import { browser } from "process";
import Link from "next/link";
import { useRouter } from "next/router";
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 700,
    lg: 990,
    xl: 1200,
  },
});

//今日の予約一覧ページ　シフト提出者IDとユーザーIDが一致するもののみ表示
export default function ReserveToday() {
  const { rsv, error } = useReserves_Today();
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
  }, [process, browser, user]);
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
                      <ButtonComponent
                        onclick={router.push(`/reserve/${user && user.uid}`)}
                      >
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
                <Media greaterThan="sm">
                  <Table size="small">
                    <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                      <TableRow>
                        <TableCell style={{ fontWeight: 600 }}>
                          講師名
                        </TableCell>
                        <TableCell style={{ fontWeight: 600 }}>
                          生徒名
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
                            <TableCell>{rsv.student}</TableCell>
                            <TableCell>
                              {dayjs(rsv.date.toDate()).format("YYYY/MM/DD ")}
                            </TableCell>
                            <TableCell>{`${rsv.time}:00`}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  {error == true && <Alert>予約は見つかりませんでした</Alert>}
                </Media>
                {/* スマホレスポンシブ */}
                <Media at="sm">
                  <Table size="small">
                    <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                      <TableRow>
                        <TableCell style={{ fontWeight: 600 }}>
                          生徒名
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
                            <TableCell>{rsv.student}</TableCell>
                            <TableCell>
                              {dayjs(rsv.date.toDate()).format("YYYY/MM/DD ")}
                            </TableCell>
                            <TableCell>{`${rsv.time}:00`}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  {error == true && <Alert>予約は見つかりませんでした</Alert>}
                </Media>
              </Grid>
            </Box>
          </CardComponent>
        </Box>
      </MediaContextProvider>
    </React.Fragment>
  );
}
