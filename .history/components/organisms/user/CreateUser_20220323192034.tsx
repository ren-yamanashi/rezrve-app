//外部インポート
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState, FormEvent } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
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
import RadioButton from "../../atoms/Button/RadioButton";
import FormControlRadio from "../../atoms/Button/ControlLabel";
import AlertComponent from "../../atoms/Alert";
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
  const db = getFirestore();
  const [sendeing, setSending] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);
  const [time, setTime] = useState<number>();
  const day = new Date(value);
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let xxx = new Date(y, m, d, 12, 0, 0);
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
                          margin={5}
                        />
                        <PrimaryText
                          color={"black"}
                          textTitle={
                            usersList && usersList.map((user) => user.userName)
                          }
                          size={20}
                        />
                      </Box>
                    </Media>
                    <Media at="sm">
                      <Box display="flex">
                        <PrimaryText
                          textTitle={"氏名 :"}
                          color={grey[600]}
                          size={15}
                          margin={3}
                        />
                        <PrimaryText
                          size={15}
                          color={"black"}
                          textTitle={
                            usersList && usersList.map((user) => user.userName)
                          }
                        />
                      </Box>
                    </Media>
                  </ItemComponent>
                </Grid>
                <Grid item xs={20} md={12} lg={12}>
                  <Box mx="auto" justifyContent="center" mt={2}>
                    <ItemComponent>
                      <DateRangePicker
                        value={value}
                        changeDate={(newValue) => {
                          setValue(newValue);
                        }}
                      />
                      <RadioButton>
                        <FormControlRadio
                          time={10}
                          radio={time}
                          clickRadio={() => {
                            setTime(10);
                          }}
                        />
                        <FormControlRadio
                          time={11}
                          radio={time}
                          clickRadio={() => {
                            setTime(11);
                          }}
                        />
                        <FormControlRadio
                          time={12}
                          radio={time}
                          clickRadio={() => {
                            setTime(12);
                          }}
                        />
                        <FormControlRadio
                          time={13}
                          radio={time}
                          clickRadio={() => {
                            setTime(13);
                          }}
                        />
                        <FormControlRadio
                          time={14}
                          radio={time}
                          clickRadio={() => {
                            setTime(14);
                          }}
                        />
                        <FormControlRadio
                          time={15}
                          radio={time}
                          clickRadio={() => {
                            setTime(15);
                          }}
                        />
                        <FormControlRadio
                          time={16}
                          radio={time}
                          clickRadio={() => {
                            setTime(16);
                          }}
                        />
                        <FormControlRadio
                          time={17}
                          radio={time}
                          clickRadio={() => {
                            setTime(17);
                          }}
                        />
                        <FormControlRadio
                          time={18}
                          radio={time}
                          clickRadio={() => {
                            setTime(18);
                          }}
                        />
                      </RadioButton>
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
            <AlertComponent>シフトは既に提出済みです</AlertComponent>
          )}
        </MediaContextProvider>
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
