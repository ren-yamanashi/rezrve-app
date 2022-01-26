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
                        label="Vi"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Pf"
                      />
                      <FormControlLabel
                        value="disabled"
                        control={<Radio />}
                        label="Gt"
                      />
                      <FormControlLabel
                        value="disabled"
                        control={<Radio />}
                        label="Ba"
                      />
                      <FormControlLabel
                        value="disabled"
                        control={<Radio />}
                        label="Uk"
                      />
                      <FormControlLabel
                        value="disabled"
                        control={<Radio />}
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
                      onChange={() => setDayOfWeek("月曜")}
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
            <Grid item xs={12} sm={6}>
              <Box ml="10vw">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    時間
                  </FormLabel>
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
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
    </>
  );
}
