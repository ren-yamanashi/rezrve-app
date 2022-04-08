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
import { useRouter } from "next/router";
import React, { useState, FormEvent } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Alert from "@mui/material/Alert";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
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
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import PrimaryText from "../../atoms/Text/Typography4";
import Title from "../../atoms/Title";
import ItemComponent from "../../atoms/Item";
import { blue, grey, teal } from "@mui/material/colors";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

const timestamp = (datetimeStr: any) => {
  return Timestamp.fromDate(new Date(datetimeStr));
};
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
            <Box sx={{ mt: 1 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid item xs={12} md={12} lg={12}>
                  <ItemComponent>
                    <Media greaterThan="sm">
                      <Box display="flex">
                        <PrimaryText
                          textTitle={"氏名 :"}
                          color={grey[600]}
                          size={20}
                        />
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
                  </ItemComponent>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Box mx="auto" justifyContent="center" mt={2}>
                    <ItemComponent>
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
                    </ItemComponent>
                  </Box>
                </Grid>
                <Box display="flex">
                  <Box width="10vw" display="flex">
                    <PrimaryBtn
                      click={createShift}
                      buttonText={"登録"}
                      style={{ mt: 3, mb: 2, ml: 5 }}
                    />
                    <PrimaryBtn
                      style={{
                        mt: 3,
                        mb: 2,
                        ml: 5,
                        bgcolor: teal[400],
                        "&:hover": { bgcolor: teal[500] },
                      }}
                      click={() => router.back()}
                      buttonText={"戻る"}
                    />
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
