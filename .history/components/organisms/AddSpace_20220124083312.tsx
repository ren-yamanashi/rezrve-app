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
  uid: string;
};

export default function AddTeacherShift() {
  const { user } = useAuth();
  const router = useRouter();
  const query = router.query as Query;
  const db = getFirestore();
  const [teacher, setTeacher] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [day, setDay] = React.useState(new Date());

  const [dayOfWeekNumber, setDayOfWeekNumber] = useState<number>();
  const [weekNumber, setWeekNumber] = useState<number>();
  const [sendeing, setSending] = useState<boolean>(false);
  let time = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  //日付をTimeStampになおす
  const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
  };

  let y = day.getFullYear();
  let m = 1 + day.getMonth();
  let d = day.getDate();
  let date = `${y}/${m}/${d}`;
  console.log(date);
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
        // dayOfWeek,
        // dayOfWeekNumber,
        // weekNumber,
        reserved: false,
        completed: false,
        time: time[i],
      });
    }
    setTeacher("");
    setDate("");
    // setDayOfWeek("");
    // setDayOfWeekNumber(null);
    // setWeekNumber(null);
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="For desktop"
                  value={day}
                  minDate={new Date("2017-01-01")}
                  onChange={(newValue) => {
                    setDay(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
            {/* <Grid item xs={12}>
              <Box ml="10vw">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    週目
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      checked={weekNumber == 1}
                      onChange={() => setWeekNumber(1)}
                      label="1"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      checked={weekNumber == 2}
                      onChange={() => setWeekNumber(2)}
                      label="2"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      checked={weekNumber == 3}
                      onChange={() => setWeekNumber(3)}
                      label="3"
                    />
                    <FormControlLabel
                      value="disabled"
                      control={<Radio />}
                      checked={weekNumber == 4}
                      onChange={() => setWeekNumber(4)}
                      label="4"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Grid> */}
            {/* <Grid item xs={12}>
              <Box ml="10vw">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    出勤曜日
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      checked={dayOfWeek === "月曜"}
                      onChange={() => {
                        setDayOfWeek("月曜"), setDayOfWeekNumber(1);
                      }}
                      label="月曜"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      checked={dayOfWeek === "火曜"}
                      onChange={() => {
                        setDayOfWeek("火曜"), setDayOfWeekNumber(2);
                      }}
                      label="火曜"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      checked={dayOfWeek === "水曜"}
                      onChange={() => {
                        setDayOfWeek("水曜"), setDayOfWeekNumber(3);
                      }}
                      label="水曜"
                    />
                    <FormControlLabel
                      value="disabled"
                      control={<Radio />}
                      checked={dayOfWeek === "木曜"}
                      onChange={() => {
                        setDayOfWeek("木曜"), setDayOfWeekNumber(4);
                      }}
                      label="木曜"
                    />
                    <FormControlLabel
                      value="disabled"
                      control={<Radio />}
                      checked={dayOfWeek === "金曜"}
                      onChange={() => {
                        setDayOfWeek("金曜"), setDayOfWeekNumber(5);
                      }}
                      label="金曜"
                    />
                    <FormControlLabel
                      value="disabled"
                      control={<Radio />}
                      checked={dayOfWeek === "土曜"}
                      onChange={() => {
                        setDayOfWeek("土曜"), setDayOfWeekNumber(6);
                      }}
                      label="土曜"
                    />
                    <FormControlLabel
                      value="disabled"
                      control={<Radio />}
                      checked={dayOfWeek === "日曜"}
                      onChange={() => {
                        setDayOfWeek("日曜"), setDayOfWeekNumber(0);
                      }}
                      label="日曜"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Grid> */}
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
