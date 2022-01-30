//外部インポート
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  Timestamp,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { ToastContainer } from "react-toastify";
import React, { useState, useEffect, FormEvent, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import Header from "../templates/Header";
import { Users } from "../../models/Users";
import { browser } from "process";
//queryの方を準備
type Query = {
  id: string;
};
//日付をTimeStamp型にして返す
const timestamp = (datetimeStr: any) => {
  return Timestamp.fromDate(new Date(datetimeStr));
};

export default function AddTeacherShift() {
  const router = useRouter();
  const query2 = router.query as Query;
  const [date, setDate] = useState<moment.Moment | null>(null);
  const [u, setU] = useState<Users[]>([]);
  const [focusedInput, setFocusedInput] = useState<boolean>(false);
  const { user } = useAuth();
  const db = getFirestore();
  const [teacher, setTeacher] = useState("");
  const [sendeing, setSending] = useState<boolean>(false);
  const [time, setTime] = useState<number>();
  const [time10, setTime10] = useState<number>();
  const [time11, setTime11] = useState<number>();
  const [time12, setTime12] = useState<number>();
  const [time13, setTime13] = useState<number>();
  const [time14, setTime14] = useState<number>();
  const [time15, setTime15] = useState<number>();
  const [time16, setTime16] = useState<number>();
  const [time17, setTime17] = useState<number>();
  const [time18, setTime18] = useState<number>();
  /**================
   * Firebaseからシフトを取り出す
   *===============*/
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    /**========
     * Firebaseからユーザーを取得
     *========*/
    async function loadUser() {
      const db = getFirestore();
      const q = query(collection(db, "users"), where("id", "==", user.uid));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return;
      }
      //ReserveList一覧の展開
      const gotUsers = snapshot.docs.map((doc) => {
        const user = doc.data() as Users;
        user.id = doc.id;
        return user;
      });
      setU(gotUsers);
    }
    loadUser();
  }, [process, browser, user]);
  /**==========
   * シフト登録
   *==========*/
  const createShift = async (e: any) => {
    const i = u.map((t) => t.userName);
    const v = i.shift();
    e.preventDefault();
    setSending(true);
    await addDoc(collection(db, "FreeSpace"), {
      teacher,
      student: v,
      date: timestamp(date),
      reserved: false,
      completed: false,
      time,
      createAt: serverTimestamp(),
      senderUid: user.uid,
    });
    setTeacher("");
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
  };
  return (
    <>
      <Header />
      <React.Fragment>
        <Box textAlign="center" mb={10}>
          <Typography variant="h6" gutterBottom>
            シフト登録
          </Typography>
        </Box>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Grid container spacing={3} display="block">
            <Grid item xs={12} sm={6}>
              <Box width="70%" textAlign="center" alignItems="center">
                <Typography
                  variant="h5"
                  component="div"
                  mx={5}
                  color="black"
                  width="20%"
                  textAlign="center"
                >
                  {u.map((item) => item.userName)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} textAlign="center">
              <Box>
                <SingleDatePicker
                  id="date"
                  focused={focusedInput}
                  date={date}
                  onDateChange={(date) => setDate(date)}
                  onFocusChange={(focusedInput) => setFocusedInput(true)}
                  onClose={(focused) => setFocusedInput(false)}
                />
              </Box>
            </Grid>
            <Box width="10vw" margin="auto" mt={5}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={createShift}
                sx={{ mt: 3, mb: 2 }}
              >
                登録
              </Button>
            </Box>
          </Grid>

          <Box width="30vw" margin="auto" mt={5} display="flex">
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, ml: 2 }}
              onClick={(e) => {
                setTime(10), createShift(e);
              }}
            >
              10:30
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, ml: 2 }}
              onClick={(e) => {
                setTime(11), createShift(e);
              }}
            >
              11:30
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, ml: 2 }}
              onClick={(e) => {
                setTime(12), createShift(e);
              }}
            >
              12:30
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, ml: 2 }}
              onClick={(e) => {
                setTime(13), createShift(e);
              }}
            >
              13:30
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, ml: 2 }}
              onClick={(e) => {
                setTime(14), createShift(e);
              }}
            >
              14:30
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, ml: 2 }}
              onClick={(e) => {
                setTime(15), createShift(e);
              }}
            >
              15:30
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, ml: 2 }}
              onClick={(e) => {
                setTime(16), createShift(e);
              }}
            >
              16:30
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, ml: 2 }}
              onClick={(e) => {
                setTime(17), createShift(e);
              }}
            >
              17:30
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, ml: 2 }}
              onClick={(e) => {
                setTime(18), createShift(e);
              }}
            >
              18:30
            </Button>
          </Box>
        </Box>
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
