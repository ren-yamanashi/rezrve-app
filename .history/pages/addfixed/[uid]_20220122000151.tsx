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
import Header from "../../components/templates/Header";
import { Input } from "@mui/material";
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
  const [student, setStudent] = useState("");
  const [teacher, setTeacher] = useState("");
  const [weekNumber, setWeekNumber] = useState<number>();
  const [sendeing, setSending] = useState<boolean>(false);
  const [time, setTime] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setTime(event.target.value as string);
  };

  //日付をTimeStampになおす
  let dt = new Date();
  dt.setFullYear(1899);
  dt.setMonth(12);
  dt.setDate(30);

  const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
  };
  //再レンダリングを防ぐ
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
      student,
      teacher,
      time: timestamp(time),
      weekNumber,
      completed: false,
    });
    setCourse("");
    setDayOfWeek("");
    setDayOfWeekNumber(null);
    setStudent("");
    setTeacher("");
    setTime(null);
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
            <Grid item xs={12} sm={6}>
              <Box width="70%" margin="auto">
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
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box ml="10vw">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    コース
                  </FormLabel>
                  <Box m={1}>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        checked={course == "Vo"}
                        onChange={() => setCourse("Vo")}
                        label="Vo"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        checked={course == "Vi"}
                        onChange={() => setCourse("Vi")}
                        label="Vi"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        checked={course == "Pf"}
                        onChange={() => setCourse("Pf")}
                        label="Pf"
                      />
                      <FormControlLabel
                        value="disabled"
                        control={<Radio />}
                        checked={course == "Gt"}
                        onChange={() => setCourse("Gt")}
                        label="Gt"
                      />
                      <FormControlLabel
                        value="disabled"
                        control={<Radio />}
                        checked={course == "Ba"}
                        onChange={() => setCourse("Ba")}
                        label="Ba"
                      />
                      <FormControlLabel
                        value="disabled"
                        control={<Radio />}
                        checked={course == "Uk"}
                        onChange={() => setCourse("Uk")}
                        label="Uk"
                      />
                      <FormControlLabel
                        value="disabled"
                        control={<Radio />}
                        checked={course == "DJ"}
                        onChange={() => setCourse("DJ")}
                        label="DJ"
                      />
                    </RadioGroup>
                  </Box>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box ml="10vw">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    曜 日
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      checked={DayOfWeek === "月曜"}
                      onChange={() => {
                        setDayOfWeek("月曜"), setDayOfWeekNumber(1);
                      }}
                      label="月曜"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      checked={DayOfWeek === "火曜"}
                      onChange={() => {
                        setDayOfWeek("火曜"), setDayOfWeekNumber(2);
                      }}
                      label="火曜"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      checked={DayOfWeek === "水曜"}
                      onChange={() => {
                        setDayOfWeek("水曜"), setDayOfWeekNumber(3);
                      }}
                      label="水曜"
                    />
                    <FormControlLabel
                      value="disabled"
                      control={<Radio />}
                      checked={DayOfWeek === "木曜"}
                      onChange={() => {
                        setDayOfWeek("木曜"), setDayOfWeekNumber(4);
                      }}
                      label="木曜"
                    />
                    <FormControlLabel
                      value="disabled"
                      control={<Radio />}
                      checked={DayOfWeek === "金曜"}
                      onChange={() => {
                        setDayOfWeek("金曜"), setDayOfWeekNumber(5);
                      }}
                      label="金曜"
                    />
                    <FormControlLabel
                      value="disabled"
                      control={<Radio />}
                      checked={DayOfWeek === "土曜"}
                      onChange={() => {
                        setDayOfWeek("土曜"), setDayOfWeekNumber(6);
                      }}
                      label="土曜"
                    />
                    <FormControlLabel
                      value="disabled"
                      control={<Radio />}
                      checked={DayOfWeek === "日曜"}
                      onChange={() => {
                        setDayOfWeek("日曜"), setDayOfWeekNumber(0);
                      }}
                      label="日曜"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
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
                      label="2"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="3"
                    />
                    <FormControlLabel
                      value="disabled"
                      control={<Radio />}
                      label="4"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box ml="10vw" width="20vh">
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Time</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={time}
                      label="時間枠"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>10:30</MenuItem>
                      <MenuItem value={20}>11:30</MenuItem>
                      <MenuItem value={30}>12:30</MenuItem>
                      <MenuItem value={30}>13:30</MenuItem>
                      <MenuItem value={30}>14:30</MenuItem>
                      <MenuItem value={30}>15:30</MenuItem>
                      <MenuItem value={30}>16:30</MenuItem>
                      <MenuItem value={30}>17:30</MenuItem>
                      <MenuItem value={30}>18:30</MenuItem>
                      <MenuItem value={30}>19:30</MenuItem>
                      <MenuItem value={30}>20:30</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
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
