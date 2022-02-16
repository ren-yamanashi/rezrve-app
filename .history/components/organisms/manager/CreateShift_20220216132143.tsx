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
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { browser } from "process";
import { useRouter } from "next/router";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import React, { useState, useEffect, FormEvent, useCallback } from "react";
import Grid from "@mui/material/Grid";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Alert from "@mui/material/Alert";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { Users } from "../../../models/Users";
import { teal } from "@mui/material/colors";
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
  background: "#FFFFDD",
}));
/**===============
 * @returns シフト登録画面の作成
 *===============*/
export default function EditReserve() {
  const router = useRouter();
  const query_ = router.query as Query;
  const [u, setU] = useState<Users>();
  const [value, setValue] = useState<Date | null>(null);
  const { user } = useAuth();
  const [userName, setUserName] = useState("");
  const [course, setCourse] = useState("");
  const db = getFirestore();
  const [sendeing, setSending] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);
  const [time, setTime] = useState<number>();
  const day = new Date(value);
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let xxx = new Date(y, m, d, 12, 0, 0);
  //collection設定
  function getCollections() {
    const db = getFirestore();
    return {
      db,
      userCollection: collection(db, "users"),
    };
  }
  /**========
   * Firebaseからユーザーを取得
   *========*/
  async function loadUser() {
    if (query_.id === undefined) {
      return;
    }
    const { userCollection } = getCollections();
    const userDoc = await getDoc(doc(userCollection, query_.id));
    if (!userDoc.exists()) {
      return;
    }
    const gotUser = userDoc.data() as Users;
    gotUser.id = userDoc.id;
    setU(gotUser);
  }
  useEffect(() => {
    loadUser();
  }, [query_.id]);
  /**==========
   * シフト登録
   *==========*/
  const createShift = async (e: any) => {
    const q = query(
      collection(db, "FreeSpace"),
      where("teacher", "==", u.userName),
      where("time", "==", time),
      where("date", "==", timestamp(xxx))
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      e.preventDefault();
      setSending(true);
      await addDoc(collection(db, "FreeSpace"), {
        teacher: u.userName,
        student: "",
        date: timestamp(xxx),
        reserved: false,
        completed: false,
        time,
        createAt: serverTimestamp(),
        senderUid: u.id,
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
    } else {
      setErr(true);
      return;
    }
  };

  /**==========
   * 更新
   *==========*/
  //   async function onSubmit(e: FormEvent<HTMLFormElement>) {
  //     e.preventDefault();
  //     const { db, userCollection } = getCollections();
  //     const userRef = doc(userCollection);
  //     try {
  //       await runTransaction(db, async (t: any) => {
  //         t.update(doc(userCollection, user.uid), {
  //           userName,
  //           course,
  //         });
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       setErr(true);
  //     }
  //   }
  return (
    <>
      <React.Fragment>
        <CardContent
          style={{
            width: "90%",
            borderRadius: "7px",
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "#4689FF",
            margin: "auto",
          }}
        >
          <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
            シフト登録
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} margin="0 auto">
                <Grid item xs={11} md={11} lg={11}>
                  <Item>
                    <Box display="flex">
                      <Typography
                        variant="h5"
                        component="div"
                        mx={5}
                        color="black"
                        textAlign="left"
                      >
                        {u && `氏名: ${u.userName}`}
                      </Typography>
                    </Box>
                  </Item>
                </Grid>
                <Grid item xs={11} md={11} lg={11}>
                  <Item>
                    <Box display="flex" mb={3} alignItems="center">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="日付を選択"
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
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
              </Grid>
              <Box display="flex">
                <Box width="10vw" display="flex">
                  <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2, ml: 5 }}
                    onClick={createShift}
                  >
                    登録
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      ml: 5,
                      bgcolor: teal[400],
                      "&:hover": { bgcolor: teal[500] },
                    }}
                    onClick={() => router.back()}
                  >
                    戻る
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
        {err == true && (
          <Box textAlign="center">
            <Grid xs={12} sm={15}>
              <Alert variant="filled" severity="info" sx={{ m: 3 }}>
                シフトは既に提出済みです
              </Alert>
            </Grid>
          </Box>
        )}
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
