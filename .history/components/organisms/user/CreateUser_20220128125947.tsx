//外部インポート
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  runTransaction,
  query,
  where,
  updateDoc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { browser } from "process";
import { useRouter } from "next/router";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import React, { useState, useEffect, FormEvent, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import Header from "../../templates/Header";
import { FreeList } from "../../../models/FreeList";
import { Users } from "../../../models/Users";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
//queryの方を準備
type Query = {
  id: string;
};
//日付をTimeStamp型にして返す
const timestamp = (datetimeStr: any) => {
  return Timestamp.fromDate(new Date(datetimeStr));
};
//Itemのスタイル
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  backgroundColor: "#FFFFDD",
}));
const Item2 = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
/**===============
 * @returns 予約登録画面の作成
 *===============*/
export default function EditReserve() {
  const router = useRouter();
  const query_ = router.query as Query;
  const [u, setU] = useState<Users[]>([]);
  const [date, setDate] = useState<moment.Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<boolean>(false);
  //フォームの入力内容をステートに保管
  const { user } = useAuth();
  const [userName, setUserName] = useState("");
  const [course, setCourse] = useState("");
  const db = getFirestore();
  const [sendeing, setSending] = useState<boolean>(false);
  const [time, setTime] = useState<number>();
  //collection設定
  function getCollections() {
    const db = getFirestore();
    return {
      db,
      userCollection: collection(db, "users"),
    };
  }
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
      teacher: v,
      student: "",
      date: timestamp(date),
      reserved: false,
      completed: false,
      time,
      createAt: serverTimestamp(),
      senderUid: user.uid,
    });
    setSending(false);
    setTime(null);
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
  /**==========
   * 更新
   *==========*/
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { db, userCollection } = getCollections();
    const userRef = doc(userCollection);
    await runTransaction(db, async (t: any) => {
      t.update(doc(userCollection, user.uid), {
        userName,
        course,
      });
    });
    router.push(`/user/${user?.uid}`);
  }
  return (
    <>
      <React.Fragment>
        <CardContent
          style={{
            width: "70%",
            borderRadius: "7px",
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "#4689FF",
            margin: "auto",
          }}
        >
          <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
            ユーザー情報 / シフト登録
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} margin="0 auto">
                <Grid item xs={11} md={15} lg={8}>
                  <Item>
                    <Box display="flex" mb={3} alignItems="center">
                      <Typography
                        variant="h5"
                        component="div"
                        mx={5}
                        color="black"
                        width="20%"
                        textAlign="left"
                      >
                        シフト登録
                      </Typography>
                      <SingleDatePicker
                        id="date"
                        focused={focusedInput}
                        date={date}
                        onDateChange={(date) => setDate(date)}
                        onFocusChange={(focusedInput) => setFocusedInput(true)}
                        onClose={(focused) => setFocusedInput(false)}
                      />
                      <Grid item xs={11} md={8} lg={8}>
                        <Box width={30} mt="auto">
                          <Button
                            variant="contained"
                            sx={{ mt: 3, mb: 2, ml: 2 }}
                            onClick={createShift}
                          >
                            登録
                          </Button>
                        </Box>
                      </Grid>
                    </Box>
                    <Box sx={{ mt: 1 }}>
                      <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            control={<Radio />}
                            label="10:30"
                            checked={time == 10}
                            onChange={() => {
                              setTime(10), console.log(time);
                            }}
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="11:30"
                            checked={time == 11}
                            onChange={() => {
                              setTime(11), console.log(time);
                            }}
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="12:30"
                            checked={time == 12}
                            onChange={() => {
                              setTime(12), console.log(time);
                            }}
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="13:30"
                            checked={time == 13}
                            onChange={() => {
                              setTime(13), console.log(time);
                            }}
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="14:30"
                            checked={time == 14}
                            onChange={() => {
                              setTime(14), console.log(time);
                            }}
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="15:30"
                            checked={time == 15}
                            onChange={() => {
                              setTime(15), console.log(time);
                            }}
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="16:30"
                            checked={time == 16}
                            onChange={() => {
                              setTime(16), console.log(time);
                            }}
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="17:30"
                            checked={time == 17}
                            onChange={() => {
                              setTime(17), console.log(time);
                            }}
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="18:30"
                            checked={time == 18}
                            onChange={() => {
                              setTime(18), console.log(time);
                            }}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Box>
                  </Item>
                </Grid>
                <Grid item xs={11} md={8} lg={8}>
                  <Item>
                    <Box display="flex">
                      <Typography
                        variant="h5"
                        component="div"
                        mx={5}
                        color="black"
                        width="30%"
                        textAlign="left"
                      >
                        {`氏名: ${u.map((user) => user.userName)}`}
                      </Typography>
                      <Box width={300}>
                        <TextField
                          required
                          id="outlined"
                          name="studentName"
                          label="名前を変更"
                          defaultValue={u.map((user) => user.userName)}
                          inputProps={{ style: { fontSize: 25 } }}
                          fullWidth
                          variant="filled"
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </Box>
                    </Box>
                  </Item>
                </Grid>
                <Grid item xs={11} md={8} lg={8}>
                  <Item>
                    <Box display="flex">
                      <Typography
                        variant="h5"
                        component="div"
                        mx={5}
                        color="black"
                        width="20%"
                        textAlign="left"
                      >
                        {`コース: ${u.map((user) => user.course)}`}
                      </Typography>
                      <Box sx={{ mt: 1 }} width="30vw">
                        <FormControl>
                          <FormLabel id="demo-row-radio-buttons-group-label">
                            コースを変更
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="Vo"
                              control={<Radio />}
                              checked={course == "Vo"}
                              onChange={() => setCourse("Vo")}
                              label="Vo"
                            />
                            <FormControlLabel
                              value="Gt"
                              control={<Radio />}
                              label="Gt"
                              checked={course == "Gt"}
                              onChange={() => setCourse("Gt")}
                            />
                            <FormControlLabel
                              value="Ba"
                              control={<Radio />}
                              checked={course == "Ba"}
                              onChange={() => setCourse("Ba")}
                              label="Ba"
                            />
                            <FormControlLabel
                              value="DJ"
                              control={<Radio />}
                              checked={course == "DJ"}
                              onChange={() => setCourse("DJ")}
                              label="DJ"
                            />
                            <FormControlLabel
                              value="Uk"
                              control={<Radio />}
                              label="Uk"
                              checked={course == "Uk"}
                              onChange={() => setCourse("Uk")}
                            />
                            <FormControlLabel
                              value="Pf"
                              control={<Radio />}
                              label="Pf"
                              checked={course == "Pf"}
                              onChange={() => setCourse("Pf")}
                            />
                            <FormControlLabel
                              value="Vi"
                              control={<Radio />}
                              label="Vi"
                              checked={course == "Vi"}
                              onChange={() => setCourse("Vi")}
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    </Box>
                  </Item>
                </Grid>
              </Grid>
              <Box display="flex">
                <Box width="10vw" mt={5} ml={5}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    更新
                  </Button>
                </Box>
                <Box width="10vw" mt={5} ml={1}>
                  <Button
                    fullWidth
                    sx={{
                      mt: 3,
                      mb: 2,
                      color: "blue",
                    }}
                    size="large"
                    onClick={() => router.push(`/user/${user?.uid}`)}
                  >
                    戻る
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
