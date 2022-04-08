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
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { createMedia } from "@artsy/fresnel";
// Import in my file
import {
  useReserves_Week,
  useReserves_student,
} from "../../hooks/teacher/reserves/useReserves";
import { useSearchStudent } from "../../hooks/user/useUserList";
import { useSelectStudent } from "../../hooks/teacher/getReserves/useSelectStudent";
import { useUserList } from "../../hooks/user/useUserList";
import { useHandle } from "../../hooks/handle/useHandle";
import SelectStudentModal from "../templates/Modal/SelectStudentModal";
import ModalComponent from "../atoms/Modal";
import Alert from "../atoms/Alert";
import PrimaryBtn from "../atoms/Button/PrimaryButton";
import FieldTx from "../atoms/Text/TextField";
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
  const { rsv, error, loadRsv } = useReserves_Week();
  const { loadRsvStudent } = useReserves_student();
  const { usersList } = useUserList();
  const { handleOpen5, handleClose5 } = useHandle();
  const { studentName, studentNum } = useSelectStudent();
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
            {error && error && <Alert>予約が見つかりませんでした</Alert>}
          </>
          {/* Modal Search　By Student Name */}
          <SelectStudentModal
            changeEvent={(e) => setSortStudent(e.target.value)}
            searchStudent={() => {
              loadSearchStudent(sortStudent);
            }}
            users={usersList && usersList}
            selectStudent={() => {
              loadRsvStudent(sortStudent);
              handleClose5();
            }}
          />
          {/* <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ModalComponent>
              <Box alignItems="top">
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box textAlign="center">
                <FieldTx
                  label="生徒名で絞り込み"
                  changeEv={(e) => setSortStudent(e.target.value)}
                  style={{ width: "60%" }}
                />
                <PrimaryBtn
                  click={() => {
                    loadRsvStudent(sortStudent);
                    handleClose();
                  }}
                  buttonText={"決定"}
                  style={{ mt: 3, mb: 2, ml: 3 }}
                />
              </Box>
            </ModalComponent>
          </Modal> */}
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
            {error && error == true && (
              <Alert>予約が見つかりませんでした</Alert>
            )}
          </>
        </Media>
      </MediaContextProvider>
    </React.Fragment>
  );
}
