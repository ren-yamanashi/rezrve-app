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
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, FormEvent, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import { User } from "../../models/User";
import { ReserveList } from "../../models/ReserveList";
import Header from "../../components/templates/Header";
//queryの方を準備
type Query = {
  uid: string;
};

export default function AddFixedReserve() {
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const query = router.query as Query;
  const db = getFirestore();
  //フォームの入力内容をステートに保管
  const { user: currentUser } = useAuth();
  const [course, setCourse] = useState("");
  const [DayOfWeek, setDayOfWeek] = useState("");
  const [DayOfWeekNumber, setDayOfWeekNumber] = useState<number>();
  const [more, setMore] = useState<string | null>(null);
  const [student, setStudent] = useState("");
  const [teacher, setTeacher] = useState("");
  const [time, setTime] = useState("");
  const [weekNumber, setWeekNumber] = useState<number>();
  const [sendeing, setSending] = useState<boolean>(false);

  //日付をTimeStampになおす
  const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
  };
  useEffect(() => {
    if (query.uid === undefined) {
      return;
    }
    /**================
     * Firebaseからユーザーを取り出す
     *===============*/
    async function loadUser() {
      const ref = doc(collection(db, "users"), query.uid);
      const UserDoc = await getDoc(ref);
      if (!UserDoc.exists()) {
        return;
      }
      const gotUser = UserDoc.data() as User;
      gotUser.uid = UserDoc.id;
      setUser(gotUser);
    }
    loadUser;
  }, [query.uid]);
  /**==========
   * 固定予約登録
   *==========*/
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    await addDoc(collection(db, "ReserveList"), {
      course,
      DayOfWeek,
      DayOfWeekNumber,
      more,
      student,
      teacher,
      time: timestamp(time),
      weekNumber,
      completed: false,
    });
    setCourse("");
    setDayOfWeek("");
    setDayOfWeekNumber(null);
    setMore("");
    setStudent("");
    setTeacher("");
    setTime("");
    setWeekNumber(null);
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
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="teacherName"
              name="teacherName"
              label="講師名"
              fullWidth
              autoComplete="teacherName"
              variant="standard"
              onChange={(e) => setTeacher(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                曜日
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="月曜"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="火曜"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="水曜"
                />
                <FormControlLabel
                  value="disabled"
                  control={<Radio />}
                  label="木曜"
                />
                <FormControlLabel
                  value="disabled"
                  control={<Radio />}
                  label="金曜"
                />
                <FormControlLabel
                  value="disabled"
                  control={<Radio />}
                  label="土曜"
                />
                <FormControlLabel
                  value="disabled"
                  control={<Radio />}
                  label="日曜"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Use this address for payment details"
            />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
