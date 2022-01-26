//外部インポート
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
  Timestamp,
  setDoc,
  runTransaction,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, FormEvent, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import { User } from "../../models/User";
import { ReserveList } from "../../models/ReserveList";
import Header from "../templates/Header";
import { Input } from "@mui/material";
//queryの方を準備
type Query = {
  id: string;
};

/**===============
 * @returns 予約登録画面の作成
 *===============*/
export default function AddFixedReserve() {
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const query = router.query as Query;
  const [reserves, setReserves] = useState<ReserveList>();
  //フォームの入力内容をステートに保管
  const { user: currentUser } = useAuth();
  const [Course, setCourse] = useState("");
  const [DayOfWeek, setDayOfWeek] = useState("");
  const [DayOfWeekNumber, setDayOfWeekNumber] = useState<number>();
  const [student, setStudent] = useState("");
  const [Teacher, setTeacher] = useState("");
  const [WeekNumber, setWeekNumber] = useState<number>();
  const [sendeing, setSending] = useState<boolean>(false);
  const [Time, setTime] = useState("");
  const [more, setMore] = useState<string | null>("");
  const handleChange = (event: SelectChangeEvent) => {
    setTime(event.target.value as string);
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
    if (query.id === undefined) {
      return;
    }
    const { reserveCollection } = getCollections();
    const reserveDoc = await getDoc(doc(reserveCollection, query.id)); //idを取り出す
    if (!reserveDoc.exists()) {
      return;
    }
    const gotReserve = reserveDoc.data() as ReserveList;
    gotReserve.id = reserveDoc.id;
    setReserves(gotReserve);
  }
  /**==========
   * 予約登録
   *==========*/
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const { db, reserveCollection } = getCollections();
    const reserveRef = doc(reserveCollection);
    await runTransaction(db, async (t: any) => {
      t.update(doc(reserveCollection, reserves.id), {
        student,
      });
    });
    setStudent("");
    setSending(false);
    toast.success("登録が完了しました", {
      position: "bottom-left",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  useEffect(() => {
    loadReserve();
  }, [query.id]);
  return (
    <>
      <Header />
      <React.Fragment>
        <Box textAlign="center" mb={10}>
          <Typography variant="h6" gutterBottom>
            予約登録
          </Typography>
        </Box>
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box width="70%" margin="auto">
                <TextField
                  required
                  id="studentName"
                  name="studentName"
                  label="生徒名"
                  fullWidth
                  autoComplete="studentName"
                  variant="standard"
                  onChange={(e) => setStudent(e.target.value)}
                />
              </Box>
            </Grid>
          </Grid>
          <Box width="10vw" margin="auto" mt={5}>
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
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
