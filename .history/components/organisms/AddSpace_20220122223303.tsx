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
import { FreeSpace } from "./FreeSpace";
import { TeacherShift } from "../../hooks/useTeacherShift";
//queryの方を準備
type Query = {
  uid: string;
};

export default function AddTeacherShift() {
  const { shiftLists } = TeacherShift();
  const { user } = useAuth();
  const router = useRouter();
  const query = router.query as Query;
  const db = getFirestore();
  const [teacher, setTeacher] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [dayOfWeekNumber, setDayOfWeekNumber] = useState<number>();
  const [weekNumber, setWeekNumber] = useState("");
  const [sendeing, setSending] = useState<boolean>(false);
  let time = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  let weekNum = [1, 2, 3, 4];

  /**==========
   * 固定予約登録
   *==========*/
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    for (let i = 0; i < time.length; i++) {
      for (let j = 0; j < time.length; j++) {
        await addDoc(collection(db, "FreeSpace"), {
          teacher,
          dayOfWeek,
          dayOfWeekNumber,
          weekNumber,
          reserved: false,
          time: time[i],
          weekNum: weekNum[j],
        });
      }
    }
    setTeacher("");
    setDayOfWeek("");
    setDayOfWeekNumber(null);
    setWeekNumber("");
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
            固定予約フォーム
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
            <Grid item xs={12}>
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
