import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { browser } from "process";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link_mui from "@mui/material/Link";
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
//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import { ReserveList } from "../../models/ReserveList";
import Title from "../atoms/Title";
import { Checkbox, TextField } from "@mui/material";

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

export default function Reserves() {
  const [Reserves, setReserves] = useState<ReserveList[]>([]);
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
     * Firebaseからデータを取得
     *========*/
    async function loadReserves() {
      const db = getFirestore();
      const q = query(collection(db, "ReserveList"));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return;
      }
      //ReserveList一覧の展開
      const gotReserves = snapshot.docs.map((doc) => {
        const reserve = doc.data() as ReserveList;
        reserve.id = doc.id;
        return reserve;
      });
      setReserves(gotReserves);
    }
    loadReserves();
  }, [process, browser, user]);
  /**=========
   * 完了・未完了の設定
   *=========*/
  const UpdateReserve = async (id: string) => {
    setComp(!comp);
    const db = getFirestore();
    const ReserveRef = doc(db, "ReserveList", id);
    await updateDoc(ReserveRef, {
      completed: comp,
    });
    const q = query(collection(db, "ReserveList"));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return;
    }
    const gotReservers = snapshot.docs.map((doc) => {
      const reserve = doc.data() as ReserveList;
      reserve.id = doc.id;
      return reserve;
    });
    setReserves(gotReservers);
  };
  /**=======
   * 並び替え
   *=======*/
  const sortReset = async () => {
    const db = getFirestore();
    const q = query(collection(db, "ReserveList"));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return;
    }
    const gotReservers = snapshot.docs.map((doc) => {
      const reserve = doc.data() as ReserveList;
      reserve.id = doc.id;
      return reserve;
    });
    setReserves(gotReservers);
  };
  //週目で並び替え
  const sortWeek = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "ReserveList"),
      orderBy("WeekNumber", "asc")
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return;
    }
    const gotReservers = snapshot.docs.map((doc) => {
      const reserve = doc.data() as ReserveList;
      reserve.id = doc.id;
      return reserve;
    });
    setReserves(gotReservers);
  };
  //週目と曜日で並び替え
  const sortWeekAndWeekday = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "ReserveList"),
      orderBy("DayOfWeekNumber", "asc"),
      orderBy("WeekNumber", "asc")
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return;
    }
    const gotReservers = snapshot.docs.map((doc) => {
      const reserve = doc.data() as ReserveList;
      reserve.id = doc.id;
      return reserve;
    });
    setReserves(gotReservers);
  };
  //週目と曜日と時間で並び替え
  const sortWeekAndWeekdayAndTime = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "ReserveList"),
      orderBy("WeekNumber", "asc"),
      orderBy("DayOfWeekNumber", "asc"),
      orderBy("Time", "asc")
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return;
    }
    const gotReservers = snapshot.docs.map((doc) => {
      const reserve = doc.data() as ReserveList;
      reserve.id = doc.id;
      return reserve;
    });
    setReserves(gotReservers);
  };
  //完了していない & 週目と曜日と時間で並び替え
  const FilterCompleted = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "ReserveList"),
      where("completed", "==", false),
      orderBy("WeekNumber", "asc"),
      orderBy("DayOfWeekNumber", "asc"),
      orderBy("Time", "asc")
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return;
    }
    const gotReservers = snapshot.docs.map((doc) => {
      const reserve = doc.data() as ReserveList;
      reserve.id = doc.id;
      return reserve;
    });
    setReserves(gotReservers);
  };
  //入力された講師名 & 週目と曜日と時間で並び替え
  const FilterTeacher = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "ReserveList"),
      where("Teacher", "==", sortTeacher),
      orderBy("WeekNumber", "asc"),
      orderBy("DayOfWeekNumber", "asc"),
      orderBy("Time", "asc")
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return;
    }
    const gotReservers = snapshot.docs.map((doc) => {
      const reserve = doc.data() as ReserveList;
      reserve.id = doc.id;
      return reserve;
    });
    setReserves(gotReservers);
  };
  //入力された生徒名 & 週目と曜日と時間で並び替え
  const FilterStudent = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "ReserveList"),
      where("Student", "==", sortStudent),
      orderBy("WeekNumber", "asc"),
      orderBy("DayOfWeekNumber", "asc"),
      orderBy("Time", "asc")
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return;
    }
    const gotReservers = snapshot.docs.map((doc) => {
      const reserve = doc.data() as ReserveList;
      reserve.id = doc.id;
      return reserve;
    });
    setReserves(gotReservers);
  };
  //入力されたコース & 週目と曜日と時間で並び替え
  const FilterCourse = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "ReserveList"),
      where("Course", "==", sortCourse),
      orderBy("WeekNumber", "asc"),
      orderBy("DayOfWeekNumber", "asc"),
      orderBy("Time", "asc")
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return;
    }
    const gotReservers = snapshot.docs.map((doc) => {
      const reserve = doc.data() as ReserveList;
      reserve.id = doc.id;
      return reserve;
    });
    setReserves(gotReservers);
  };
  return (
    <React.Fragment>
      <Title>固定予約一覧表</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Box>
                講師名
                <IconButton onClick={handleOpen}>
                  <FilterListIcon />
                </IconButton>
                <IconButton onClick={sortReset}>
                  <RestartAltIcon />
                </IconButton>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Box alignItems="top" m={0}>
                      <IconButton onClick={handleClose}>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                    <Box textAlign="center">
                      <TextField
                        margin="normal"
                        required
                        id="sortTeacher"
                        label="講師名で絞り込み"
                        name="sortTeacher"
                        autoComplete="sortTeacher"
                        autoFocus
                        onChange={(e) => setSortTeacher(e.target.value)}
                      />
                      <Button
                        type="submit"
                        onClick={FilterTeacher}
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

            <TableCell>
              <Box>
                生徒名
                <IconButton onClick={handleOpen3}>
                  <FilterListIcon />
                </IconButton>
                <IconButton onClick={sortReset}>
                  <RestartAltIcon />
                </IconButton>
                <Modal
                  open={open3}
                  onClose={handleClose3}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Box alignItems="top" m={0}>
                      <IconButton onClick={handleClose3}>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                    <Box textAlign="center">
                      <TextField
                        margin="normal"
                        required
                        id="sortTeacher"
                        label="生徒名で絞り込み"
                        name="sortStudent"
                        autoComplete="sortStudent"
                        autoFocus
                        onChange={(e) => setSortStudent(e.target.value)}
                      />
                      <Button
                        type="submit"
                        onClick={FilterStudent}
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
            <TableCell>
              <Box>
                コース
                <IconButton onClick={handleOpen2}>
                  <FilterListIcon />
                </IconButton>
                <IconButton onClick={sortReset}>
                  <RestartAltIcon />
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
                    <Box textAlign="center">
                      <TextField
                        margin="normal"
                        required
                        id="sortCourse"
                        label="コースで絞り込み"
                        name="sortCourse"
                        autoComplete="sortCourse"
                        autoFocus
                        onChange={(e) => setSortCourse(e.target.value)}
                      />
                      <Button
                        type="submit"
                        onClick={FilterCourse}
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
            <TableCell>
              週目
              <IconButton onClick={sortWeek}>
                <FilterListIcon />
              </IconButton>
              <IconButton onClick={sortReset}>
                <RestartAltIcon />
              </IconButton>
            </TableCell>
            <TableCell onClick={sortWeekAndWeekday}>
              曜日
              <IconButton>
                <FilterListIcon />
              </IconButton>
              <IconButton onClick={sortReset}>
                <RestartAltIcon />
              </IconButton>
            </TableCell>
            <TableCell>
              時間
              <IconButton onClick={sortWeekAndWeekdayAndTime}>
                <FilterListIcon />
              </IconButton>
              <IconButton onClick={sortReset}>
                <RestartAltIcon />
              </IconButton>
            </TableCell>
            <TableCell>備考</TableCell>
            <TableCell>
              完了
              <IconButton onClick={FilterCompleted}>
                <FilterListIcon />
              </IconButton>
              <IconButton onClick={sortReset}>
                <RestartAltIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Reserves.map((rsv) => (
            <TableRow key={rsv.id}>
              <TableCell>{rsv.Teacher}</TableCell>
              <TableCell>{rsv.Student}</TableCell>
              <TableCell>{rsv.Course}</TableCell>
              <TableCell>{rsv.WeekNumber}</TableCell>
              <TableCell>{rsv.DayOfWeek}</TableCell>
              <TableCell>{dayjs(rsv.Time.toDate()).format("HH:mm")}</TableCell>
              <TableCell>{rsv.More}</TableCell>
              <TableCell>
                <Checkbox
                  checked={rsv.completed}
                  onClick={() => UpdateReserve(rsv.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
