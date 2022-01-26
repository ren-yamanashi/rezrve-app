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
} from "firebase/firestore";
import { toast } from "react-toastify";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import { ToastContainer } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import FormGroup from "@mui/material/FormGroup";
import DateFnsUtils from "@date-io/date-fns";
import React, { useState, useEffect, FormEvent, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import { User } from "../../models/User";
import Header from "../templates/Header";
//queryの方を準備
type Query = {
  uid: string;
};
//日付をTimeStamp型にして返す
const timestamp = (datetimeStr: any) => {
  return Timestamp.fromDate(new Date(datetimeStr));
};

export default function AddTeacherShift() {
  const [date, setDate] = useState<moment.Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<boolean>(false);
  console.log(date);

  const { user } = useAuth();
  const router = useRouter();
  const query = router.query as Query;
  const db = getFirestore();
  const [teacher, setTeacher] = useState("");
  const [sendeing, setSending] = useState<boolean>(false);
  let time = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  // //日付をなおす
  // const [day, setDay] = React.useState(new Date());
  // let y = day.getFullYear();
  // let m = 1 + day.getMonth();
  // let d = day.getDate();
  // let date = `${y}/${m}/${d}`;
  /**==========
   * シフト登録
   *==========*/
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    for (let i = 0; i < time.length; i++) {
      await addDoc(collection(db, "FreeSpace"), {
        teacher,
        student: "",
        date: timestamp(date),
        reserved: false,
        completed: false,
        time: time[i],
        createAt: serverTimestamp(),
        senderUid: user.uid,
      });
    }
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
  }
  return (
    <>
      <Header />
      <React.Fragment>
        <Box textAlign="center" mb={10}>
          <Typography variant="h6" gutterBottom>
            シフト登録
          </Typography>
        </Box>
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box width="70%" margin="auto">
                <TextField
                  required
                  id="teacherName"
                  name="teacherName"
                  label="講師名"
                  fullWidth
                  autoComplete="teacherName"
                  defaultValue=""
                  variant="standard"
                  onChange={(e) => setTeacher(e.target.value)}
                />
              </Box>
            </Grid>
            <SingleDatePicker
              id="date"
              focused={focusedInput}
              date={date}
              onDateChange={(date) => setDate(date)}
              onFocusChange={(focusedInput) => setFocusedInput(true)}
              onClose={(focused) => setFocusedInput(false)}
            />
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
