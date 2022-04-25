import { useRouter } from "next/router";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ToastContainer } from "react-toastify";
import { createMedia } from "@artsy/fresnel";
import { blue, grey, teal } from "@mui/material/colors";
// import my File
import { useDate } from "../../../hooks/date/useDate";
import CardComponent from "../../atoms/Card/CardComponent";
import { useTeacher } from "../../../hooks/firebase/user/useUserList";
import { useCreateShift } from "../../../hooks/firebase/teacher/useCreateShift";
import { useEventTime } from "../../../hooks/useEventTime";
import DateRangePicker from "../../atoms/Date/Date ";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import PrimaryText from "../../atoms/Text/Typography4";
import Title from "../../atoms/Text/PrimaryTitle";
import ItemComponent from "../../atoms/Item/Item";
import RadioButton from "../../atoms/Button/RadioButton";
import FormControlRadio from "../../atoms/Button/ControlLabel";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

const CreateShift = () => {
  console.log("シフト登録");
  const router = useRouter();
  const { timeArr } = useEventTime();
  const { createShift } = useCreateShift();
  const { changeDateValue, dateValue } = useDate();
  const { usersList } = useTeacher();
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
                        {timeArr.map((item) => (
                          <>
                            <FormControlRadio
                              time={item}
                              radio={time}
                              clickRadio={() => {
                                setTime(item);
                              }}
                            />
                          </>
                        ))}
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
        </MediaContextProvider>
      </React.Fragment>
      <ToastContainer />
    </>
  );
};

export default CreateShift;
