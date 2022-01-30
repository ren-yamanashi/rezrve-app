import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
  getDocs,
  startAt,
  endAt,
  Timestamp,
} from "firebase/firestore";
import { browser } from "process";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
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
import { Checkbox, TextField } from "@mui/material";
//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import { FreeList } from "../../models/FreeList";
import Title from "../atoms/Title";
//日付をTimeStamp型にして返す
const timestamp = (datetimeStr: any) => {
  return Timestamp.fromDate(new Date(datetimeStr));
};
//Modalのスタイル
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",

  boxShadow: 24,
  p: 4,
};

export default function ReserveToday() {
  const [reserves, setReserves] = useState<FreeList[]>([]);
  const { user } = useAuth();
  const [comp, setComp] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [sortTeacher, setSortTeacher] = useState<string>("");
  const [sortCourse, setSortCourse] = useState<string>("");
  const [sortStudent, setSortStudent] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleOpen3 = () => setOpen3(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const handleClose3 = () => setOpen3(false);
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    /**========
     * Firebaseからシフトを取得
     *========*/
    async function loadReserves() {
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("reserved", "==", true),
        orderBy("date", "asc"),
        orderBy("time", "asc")
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return;
      }
      //ReserveList一覧の展開
      const gotReserves = snapshot.docs.map((doc) => {
        const reserve = doc.data() as FreeList;
        reserve.id = doc.id;
        return reserve;
      });
      setReserves(gotReserves);
    }
    loadReserves();
  }, [process, browser, user]);
  return (
    <React.Fragment>
      <Box ml={3}>
        <Title>本日の予約</Title>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Box>講師名</Box>
            </TableCell>
            <TableCell>
              <Box>生徒名</Box>
            </TableCell>
            <TableCell>予約日時</TableCell>
            <TableCell>
              <Box>
                コース
                <IconButton onClick={handleOpen2}>
                  <FilterListIcon />
                </IconButton>
                <Modal
                  open={open2}
                  onClose={handleClose2}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Box alignItems="top" m={0}>
                      <IconButton onClick={handleClose2}>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          checked={sortCourse == "Vo"}
                          onChange={() => setSortCourse("Vo")}
                          label="Vo"
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          checked={sortCourse == "Vi"}
                          onChange={() => setSortCourse("Vi")}
                          label="Vi"
                        />
                        <FormControlLabel
                          value="other"
                          control={<Radio />}
                          checked={sortCourse == "Pf"}
                          onChange={() => setSortCourse("Pf")}
                          label="Pf"
                        />
                        <FormControlLabel
                          value="disabled"
                          control={<Radio />}
                          checked={sortCourse == "Gt"}
                          onChange={() => setSortCourse("Gt")}
                          label="Gt"
                        />
                        <FormControlLabel
                          value="disabled"
                          control={<Radio />}
                          checked={sortCourse == "Ba"}
                          onChange={() => setSortCourse("Ba")}
                          label="Ba"
                        />
                        <FormControlLabel
                          value="disabled"
                          control={<Radio />}
                          checked={sortCourse == "Uk"}
                          onChange={() => setSortCourse("Uk")}
                          label="Uk"
                        />
                        <FormControlLabel
                          value="disabled"
                          control={<Radio />}
                          checked={sortCourse == "DJ"}
                          onChange={() => setSortCourse("DJ")}
                          label="DJ"
                        />
                      </RadioGroup>
                    </FormControl>
                    <Box textAlign="right" mr={5}>
                      <Button
                        type="submit"
                        onClick={() => {
                          handleClose2();
                        }}
                        variant="contained"
                        sx={{ mt: 3, mb: 2, ml: 3 }}
                      >
                        決定
                      </Button>
                    </Box>
                  </Box>
                </Modal>
              </Box>
            </TableCell>
            <TableCell>時間</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reserves.map((rsv) => (
            <TableRow key={rsv.id}>
              <TableCell>{rsv.teacher}</TableCell>
              <TableCell>{rsv.student}</TableCell>
              <TableCell>
                {dayjs(rsv.date.toDate()).format("YYYY/MM/DD ")}
              </TableCell>
              <TableCell>{rsv.course}</TableCell>
              <TableCell>{`${rsv.time}:30`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
