import React, { useState } from "react";
import dayjs from "dayjs";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Box from "@mui/material/Box";
import { createMedia } from "@artsy/fresnel";
// Import in my file
import {
  useReserves_Week,
  useReserves_student,
} from "../../hooks/teacher/reserves/useReserves";
import { useSearchStudent } from "../../hooks/user/useUserList";
import { useUserList } from "../../hooks/user/useUserList";
import { useHandle } from "../../hooks/handle/useHandle";
import SelectStudentModal from "../templates/Modal/SelectStudentModal";
import Alert from "../atoms/Alert";
// Create media
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});
export default function Reserves() {
  console.log("1週間の予約");
  const { rsv, error2, loadRsv } = useReserves_Week();
  const { usersList } = useUserList();
  const { handleOpen5 } = useHandle();
  const { loadSearchStudent } = useSearchStudent();
  const [sortStudent, setSortStudent] = useState<string>("");
  console.log(error2);
  return (
    <React.Fragment>
      <MediaContextProvider>
        <Media greaterThan="sm">
          <>
            <Table size="small">
              <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                <TableRow>
                  <TableCell style={{ fontWeight: 600 }}>講師名</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>
                    <Box>
                      生徒名
                      <IconButton onClick={handleOpen5}>
                        <FilterListIcon />
                      </IconButton>
                      <IconButton onClick={loadRsv}>
                        <RestartAltIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell style={{ fontWeight: 600 }}>予約日時</TableCell>
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
            {error && error == true && (
              <Alert>予約が見つかりませんでした</Alert>
            )}
          </>
          {/* Modal Search　By Student Name */}
          <SelectStudentModal
            changeEvent={(e) => setSortStudent(e.target.value)}
            searchStudent={() => {
              loadSearchStudent(sortStudent);
            }}
            users={usersList && usersList}
          />
        </Media>
        {/* res Phone */}
        <Media at="sm">
          <>
            <Table size="small">
              <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                <TableRow>
                  <TableCell style={{ fontWeight: 600, fontSize: "13px" }}>
                    生徒名
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
            {error2 && error2 == true && (
              <Alert>予約が見つかりませんでした</Alert>
            )}
          </>
        </Media>
      </MediaContextProvider>
    </React.Fragment>
  );
}
