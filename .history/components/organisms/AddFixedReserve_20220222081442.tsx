//外部インポート
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  runTransaction,
  orderBy,
  startAt,
  endAt,
  Timestamp,
  where,
} from "firebase/firestore";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useState, useEffect, FormEvent, useCallback } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
//内部インポート
//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import Header from "../templates/Header";
import { FreeList } from "../../models/FreeList";
import { Users } from "../../models/Users";
//queryの方を準備
type Query = {
  id: string;
};

/**===============
 * @returns 予約登録画面の作成 ※名前とコースを入力
 *===============*/
export default function AddFixedReserve() {
  const router = useRouter();
  const query2 = router.query as Query;
  const [reserves, setReserves] = useState<FreeList>();
  //フォームの入力内容をステートに保管
  const { user } = useAuth();
  const [users, setUsers] = useState<Users[]>([]);
  const [student, setStudent] = useState("");
  const [course, setCourse] = useState("");
  const [reserved, setReserved] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
  };
  //collection設定
  function getCollections() {
    const db = getFirestore();
    return {
      db,
      reserveCollection: collection(db, "FreeSpace"),
    };
  }
  /**================
   * Firebaseからシフトを取り出す
   *===============*/
  async function loadReserve() {
    if (query2.id === undefined) {
      return;
    }
    const { reserveCollection } = getCollections();
    const reserveDoc = await getDoc(doc(reserveCollection, query2.id)); //idを取り出す
    if (!reserveDoc.exists()) {
      return;
    }
    const gotReserve = reserveDoc.data() as FreeList;
    gotReserve.id = reserveDoc.id;
    if (gotReserve.student !== "") {
      setReserved(true);
    }
    setReserves(gotReserve);
  }
  /**==========
   * 予約登録
   *==========*/
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    setErr(false);
    setComplete(false);
    e.preventDefault();
    const { db, reserveCollection } = getCollections();
    const reserveRef = doc(reserveCollection);
    const q = query(
      collection(db, "FreeSpace"),
      where("time", "==", reserves.time),
      where("date", "==", reserves.date),
      where("student", "==", student)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      await runTransaction(db, async (t: any) => {
        t.update(doc(reserveCollection, reserves.id), {
          student,
          course,
          reserved: true,
        });
      });
      setStudent("");
      setCourse("");
      setComplete(true);
    } else {
      setErr(true);
      return;
    }
    router.back();
  }
  useEffect(() => {
    loadReserve();
  }, [query2.id]);
  const searchStudents = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "users"),
      where("role", "==", "student"),
      orderBy("userName"),
      startAt(student),
      endAt(student + "\uf8ff")
    );
    const snapshot = await getDocs(q);
    const gotUser = snapshot.docs.map((doc) => {
      const user = doc.data() as Users;
      user.id = doc.id;
      return user;
    });
    setUsers(gotUser);
  };
  return (
    <>
      <React.Fragment>
        <Box textAlign="center" mb={5}>
          <Typography variant="h6" gutterBottom>
            予約登録
          </Typography>
        </Box>
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
          <Box sx={{ mt: 1 }} width="30vw" margin="auto">
            <Box mb={3}>{`講師名 : ${reserves?.teacher}`}</Box>
            <Box>{`日時 : ${dayjs(reserves?.date.toDate()).format(
              "YYYY/MM/DD "
            )}${reserves?.time}:30`}</Box>
            <Box display="flex">
              <TextField
                margin="normal"
                id="studentName"
                label="生徒名"
                fullWidth
                autoComplete="studentName"
                onChange={(e) => setStudent(e.target.value)}
              />
              <IconButton>
                <SearchIcon fontSize=""="large" />
              </IconButton>
            </Box>
          </Box>
          <Box width="10vw" margin="auto">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              登録
            </Button>
          </Box>
        </Box>
        {err == true && (
          <Grid xs={12} sm={15}>
            <Alert
              variant="filled"
              severity="error"
              sx={{ m: 3, textAlign: "center" }}
            >
              エラー : 同時間帯で既に予約済みです
            </Alert>
          </Grid>
        )}
        {complete == true && (
          <Grid xs={12} sm={15}>
            <Alert
              variant="filled"
              severity="success"
              sx={{ m: 3, textAlign: "center" }}
            >
              予約を登録しました
            </Alert>
          </Grid>
        )}
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
