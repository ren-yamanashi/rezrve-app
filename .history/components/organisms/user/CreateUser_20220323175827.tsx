//外部インポート
import {
  addDoc,
  collection,
  doc,
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
import { createMedia } from "@artsy/fresnel";
//内部インポート
import CardComponent from "../../atoms/CardComponent";
import { useTeacher } from "../../../hooks/user/useUserList";
import { useAuth } from "../../../hooks/useUserAuth";
import DateRangePicker from "../../atoms/Date/Date ";
import { Users } from "../../../models/Users";
import Title from "../../atoms/Title";
import { blue, grey, teal } from "@mui/material/colors";
import { ja } from "date-fns/locale";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

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
  const [value, setValue] = useState<Date | null>(null);
  //フォームの入力内容をステートに保管
  const { user } = useAuth();
  const { usersList } = useTeacher();
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
  /**==========
   * シフト登録
   *==========*/
  const createShift = async (e: any) => {
    setErr(false);
    const i = usersList && usersList.map((t) => t.userName);
    const v = i.shift();
    const q = query(
      collection(db, "FreeSpace"),
      where("teacher", "==", v),
      where("time", "==", time),
      where("date", "==", timestamp(xxx))
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      e.preventDefault();
      setSending(true);
      await addDoc(collection(db, "FreeSpace"), {
        teacher: v,
        student: "",
        date: timestamp(xxx),
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
    } else {
      setErr(true);
      return;
    }
  };
  /**==========
   * 更新
   *==========*/
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { db, userCollection } = getCollections();
    const userRef = doc(userCollection);
    try {
      await runTransaction(db, async (t: any) => {
        t.update(doc(userCollection, user.uid), {
          userName,
          course,
        });
      });
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  }
  return (
    <>
      <React.Fragment>
        <MediaContextProvider>
          <CardComponent>
            <Box ml={3} mb={1}>
              <Title>シフト登録</Title>
            </Box>
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid item xs={12} md={12} lg={12}>
                  <Item>
                    <Media greaterThan="sm">
                      <Box display="flex">
                        <Typography
                          variant="h6"
                          component="div"
                          mx={2}
                          color={grey[600]}
                          textAlign="left"
                        >
                          氏名:
                        </Typography>
                        <Typography
                          variant="h5"
                          component="div"
                          color="black"
                          textAlign="left"
                        >
                          {usersList && usersList.map((user) => user.userName)}
                        </Typography>
                      </Box>
                    </Media>
                    <Media at="sm">
                      <Box display="flex">
                        <Typography
                          variant="h6"
                          fontSize={15}
                          component="div"
                          mx={5}
                          color="black"
                          textAlign="left"
                        >
                          {`氏名: ${
                            usersList && usersList.map((user) => user.userName)
                          }`}
                        </Typography>
                      </Box>
                    </Media>
                  </Item>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Box mx="auto" justifyContent="center" mt={2}>
                    <Item>
                      <DateRangePicker
                        value={value}
                        changeDate={(newValue) => {
                          setValue(newValue);
                        }}
                      />
                      <Box sx={{ mt: 1 }}>
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              control={<Radio />}
                              label="10:00"
                              checked={time == 10}
                              onChange={() => {
                                setTime(10);
                              }}
                            />
                            <FormControlLabel
                              control={<Radio />}
                              label="11:00"
                              checked={time == 11}
                              onChange={() => {
                                setTime(11);
                              }}
                            />
                            <FormControlLabel
                              control={<Radio />}
                              label="12:00"
                              checked={time == 12}
                              onChange={() => {
                                setTime(12);
                              }}
                            />
                            <FormControlLabel
                              control={<Radio />}
                              label="13:00"
                              checked={time == 13}
                              onChange={() => {
                                setTime(13);
                              }}
                            />
                            <FormControlLabel
                              control={<Radio />}
                              label="14:00"
                              checked={time == 14}
                              onChange={() => {
                                setTime(14);
                              }}
                            />
                            <FormControlLabel
                              control={<Radio />}
                              label="15:00"
                              checked={time == 15}
                              onChange={() => {
                                setTime(15);
                              }}
                            />
                            <FormControlLabel
                              control={<Radio />}
                              label="16:00"
                              checked={time == 16}
                              onChange={() => {
                                setTime(16);
                              }}
                            />
                            <FormControlLabel
                              control={<Radio />}
                              label="17:00"
                              checked={time == 17}
                              onChange={() => {
                                setTime(17);
                              }}
                            />
                            <FormControlLabel
                              control={<Radio />}
                              label="18:00"
                              checked={time == 18}
                              onChange={() => {
                                setTime(18);
                              }}
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    </Item>
                  </Box>
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
          </CardComponent>
          {err == true && (
            <Box textAlign="center">
              <Grid xs={12} sm={15}>
                <Alert variant="filled" severity="info" sx={{ m: 3 }}>
                  シフトは既に提出済みです
                </Alert>
              </Grid>
            </Box>
          )}
        </MediaContextProvider>
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
