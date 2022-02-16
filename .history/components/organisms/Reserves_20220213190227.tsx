import {
  collection,
  getFirestore,
  orderBy,
  query,
  Timestamp,
  where,
  getDocs,
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
import { TextField } from "@mui/material";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import { FreeList } from "../../models/FreeList";
import Title from "../atoms/Title";
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

//予約一覧ページ　予約済みフラグ(reserved)が true のみ表示
//シフト提出者IDとユーザーIDが一致する予約のみ表示
export default function Reserves() {
  const [reserves, setReserves] = useState<FreeList[]>([]);
  const { user } = useAuth();
  const router = useRouter();
  const [err, setErr] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [test, setTest] = useState<string>("");
  const [sortTeacher, setSortTeacher] = useState<string>("");
  const [sortCourse, setSortCourse] = useState<string>("");
  const [sortStudent, setSortStudent] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleOpen3 = () => setOpen3(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const handleClose3 = () => setOpen3(false);
  const day = new Date();
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let xxx = new Date(y, m, d, 12, 0, 0);
  //日付をTimeStamp型にして返す
  const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
  };
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
      const u = user;
      setTest(u.displayName);
      console.log(test);
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("senderUid", "==", user.uid),
        where("date", ">=", timestamp(xxx)),
        where("reserved", "==", true),
        orderBy("date", "desc"),
        orderBy("time", "asc")
      );
      const snapshot = await getDocs(q);
      console.log(user.displayName);
      if (snapshot.empty) {
        setErr(true);
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
  /**=======
   * 並び替え
   *=======*/
  const sortReset = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("senderUid", "==", user.uid),
      where("date", ">=", timestamp(xxx)),
      where("reserved", "==", true),
      orderBy("date", "desc"),
      orderBy("time", "asc")
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      setErr(true);
    }
    const gotReservers = snapshot.docs.map((doc) => {
      const reserve = doc.data() as FreeList;
      reserve.id = doc.id;
      return reserve;
    });
    setReserves(gotReservers);
  };
  //入力された生徒名 & 週目と曜日と時間で並び替え
  const filterStudent = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("senderUid", "==", user.uid),
      where("student", "==", sortStudent),
      where("date", ">=", timestamp(xxx)),
      where("reserved", "==", true),
      orderBy("date", "desc")
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      setErr(true);
    }
    const gotReservers = snapshot.docs.map((doc) => {
      const reserve = doc.data() as FreeList;
      reserve.id = doc.id;
      return reserve;
    });
    setReserves(gotReservers);
  };
  return (
    <React.Fragment>
      <>
        <Box ml={3}>
          <Title>予約一覧</Title>
        </Box>
        {test.indexOf("管理者") !== -1 && (
          <Box ml={3}>
            <Button onClick={() => router.push(`/reserve/all/${user.uid}`)}>
              全予約一覧を見る
            </Button>
          </Box>
        )}
        <Table size="small">
          <TableHead style={{ backgroundColor: "#FFFFDD" }}>
            <TableRow>
              <TableCell style={{ fontWeight: 600 }}>
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
                          onClick={() => {
                            filterStudent(), handleClose3();
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
              <TableCell style={{ fontWeight: 600 }}>予約日時</TableCell>
              <TableCell style={{ fontWeight: 600 }}>時間</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reserves.map((rsv) => (
              <TableRow key={rsv.id}>
                <TableCell>{rsv.student}</TableCell>
                <TableCell>
                  {dayjs(rsv.date.toDate()).format("YYYY/MM/DD ")}
                </TableCell>
                <TableCell>{`${rsv.time}:30`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {err == true && (
          <Grid xs={12} sm={15}>
            <Alert
              variant="filled"
              severity="error"
              sx={{ m: 3, textAlign: "center" }}
            >
              エラー : 指定した条件では見つかりませんでした
              <Button
                onClick={() => {
                  setErr(false), sortReset();
                }}
                size="small"
                sx={{ color: "red", bgcolor: "whitesmoke", m: 1 }}
              >
                了解
              </Button>
            </Alert>
          </Grid>
        )}
      </>
    </React.Fragment>
  );
}
