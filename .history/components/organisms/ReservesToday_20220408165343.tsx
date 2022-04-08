import React from "react";
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
// import in my File
import { useReserves_Today } from "../../hooks/teacher/reserves/useReserves";
import Title from "../atoms/Title";
import CardComponent from "../atoms/CardComponent";
import ButtonComponent from "../atoms/Button/Button";
import Error from "../atoms/Alert/Error";
import Alert from "../atoms/Alert/Alert";
import { useAlert } from "../../hooks/alert/useAlert";
// Create Media
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 700,
    lg: 990,
    xl: 1200,
  },
});
export default function ReserveToday() {
  console.log("今日の予約");
  const { rsv_today, error } = useReserves_Today();
  const { errMsg } = useAlert();
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
                      {rsv_today &&
                        rsv_today.map((rsv) => (
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
                {/* res Mobile */}
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
                      {rsv_today &&
                        rsv_today.map((rsv) => (
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
