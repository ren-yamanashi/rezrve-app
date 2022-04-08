import { useRouter } from "next/router";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ToastContainer } from "react-toastify";
import { createMedia } from "@artsy/fresnel";
import { blue, grey, teal } from "@mui/material/colors";
// import my File
import { useDate } from "../../../hooks/date/useDate";
import CardComponent from "../../atoms/CardComponent";
import { useTeacher } from "../../../hooks/user/useUserList";
import { useCreateShift } from "../../../hooks/teacher/createShift/useCreateShift";
import DateRangePicker from "../../atoms/Date/Date ";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import PrimaryText from "../../atoms/Text/Typography4";
import Title from "../../atoms/Title";
import ItemComponent from "../../atoms/Item";
import RadioButton from "../../atoms/Button/RadioButton";
import FormControlRadio from "../../atoms/Button/ControlLabel";
import AlertComponent from "../../atoms/Alert/Alert";
// Create Shift
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

export default function EditReserve() {
  console.log("シフト登録");
  const router = useRouter();
  const { createShift, createShiftError } = useCreateShift();
  const { changeDateValue, dateValue, newDateTime } = useDate();
  const { usersList, loadUserError } = useTeacher();
  const [time, setTime] = useState<number>();
  const i = usersList && usersList.map((t) => t.userName);
  const teacher = i.shift();
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
                        value={dateValue}
                        changeDate={(newValue) => {
                          changeDateValue(newValue);
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
                      click={(e) => createShift(e, teacher, time)}
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
          {loadUserError && loadUserError == true && (
            <AlertComponent>ユーザー情報の取得に失敗しました</AlertComponent>
          )}
          {createShiftError && createShiftError == true && (
            <AlertComponent>シフト登録に失敗しました</AlertComponent>
          )}
        </MediaContextProvider>
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
