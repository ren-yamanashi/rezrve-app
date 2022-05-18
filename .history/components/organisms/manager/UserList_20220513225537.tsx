import * as React from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { blue, teal } from "@mui/material/colors";
import { ToastContainer } from "react-toastify";
//import my File
import { Tooltip } from "@mui/material";
import { useStaffList } from "../../../hooks/firebase/user/useUserList";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
import { useHandle } from "../../../hooks/useHandle";
import { userProps } from "../../../models/userProps";
import { timeProps } from "../../../models/timeProps";
import { usePrismaReserve } from "../../../hooks/prisma/useReserve";
import { Query } from "../../../models/router_query";
import AlertComponent from "../../atoms/Alert/Alert";
import CreateShiftModal from "../../templates/Modal/CreateShift_manager";
import { useRouter } from "next/router";
import { useDate } from "../../../hooks/date/useDate";
// スタッフ一覧（シフト登録）

const UsersList: React.FC<{ users: userProps; times: timeProps }> = ({
  users,
  times,
}) => {
  const router = useRouter();
  const query = router.query as Query;
  const { open, handleOpen1, handleClose1 } = useHandle();
  const { handleChangeTime, rsvData, selectTeacher } = useSelectReserve();
  // const { deleteTeacher } = useStaffList();
  const { createShift } = usePrismaReserve();
  const { changeDateValue, dateValue } = useDate();
  const data = {
    companyId: query.id,
    date: dateValue,
    time: rsvData.time,
    staffName: rsvData.teacherName,
    userId: rsvData.teacherId,
  };
  const options = [];
  times[0].number.map((time) => [
    options.push({ value: time, label: `${time}:00` }),
  ]);
  return (
    <>
      <React.Fragment>
        <>
          <Box display="flex" flexWrap="wrap">
            {!users ? (
              <AlertComponent>スタッフを追加してください</AlertComponent>
            ) : (
              <>
                <Box mb={3} display="flex" justifyContent="center" mx="auto">
                  <Grid item xs={6} sm={4} lg={4} md={5}>
                    <Box
                      mb={3}
                      display="flex"
                      justifyContent="center"
                      mx="auto"
                    >
                      <CardContent
                        style={{
                          borderRadius: "7px",
                          borderStyle: "solid",
                          borderWidth: "2px",
                          margin: "auto",
                          height: 250,
                        }}
                      >
                        <Grid item xs={6} sm={8} lg={3} md={8}>
                          <Box
                            sx={{
                              justifyContent: "center",
                              textAlign: "center",
                              alignItems: "center",
                            }}
                          >
                            <CardMedia
                              component="img"
                              sx={{
                                width: 200,
                                height: 120,
                                borderRadius: "10%",
                                justifyContent: "center",
                                textAlign: "center",
                                alignItems: "center",
                              }}
                              image={users.staffImageUrl}
                              alt="Icon"
                            />
                          </Box>
                        </Grid>
                        <Box display="flex" justifyContent="center">
                          <IconButton
                            onClick={() => {
                              handleOpen1();
                              selectTeacher(users);
                            }}
                          >
                            <PersonAddAltIcon
                              sx={{ color: blue[500], m: "auto" }}
                            />
                            <Box my="auto" ml={2}>
                              <Typography
                                fontSize={15}
                                sx={{ color: blue[500] }}
                              >
                                シフト登録
                              </Typography>
                            </Box>
                          </IconButton>
                        </Box>
                        <Box display="flex" margin="auto">
                          <Typography
                            sx={{ fontSize: 15, mx: "auto", mt: 1.5 }}
                          >
                            {`氏名 : ${users.userName}`}
                          </Typography>
                          {/* <Tooltip title="ユーザーを削除" arrow>
                            <IconButton
                              onClick={(e) => deleteTeacher(e, users.id)}
                            >
                              <DeleteIcon
                                sx={{
                                  fontSize: 30,
                                  color: teal[500],
                                  alignItems: "center",
                                  my: "auto",
                                }}
                              />
                            </IconButton>
                          </Tooltip> */}
                        </Box>
                      </CardContent>
                    </Box>
                  </Grid>
                </Box>
              </>
            )}
          </Box>
        </>
        <CreateShiftModal
          open={open.open1}
          options={options}
          handleClose={handleClose1}
          dateValue={dateValue}
          changeDateValue={(newValue) => changeDateValue(newValue)}
          staffName={rsvData.teacherName}
          time={rsvData.time}
          changeSelect={handleChangeTime}
          createShift={(e) => {
            console.log(data);
            createShift(e, data);
            handleClose1();
          }}
        />
      </React.Fragment>
      <ToastContainer />
    </>
  );
};

export default UsersList;
