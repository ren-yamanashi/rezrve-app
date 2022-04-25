import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import * as React from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { blue, teal } from "@mui/material/colors";
import { ToastContainer } from "react-toastify";
//import my File
import { useHandle } from "../../../hooks/useHandle";
import Title from "../../atoms/Text/PrimaryTitle";
import { Tooltip } from "@mui/material";
import { useStaffList } from "../../../hooks/firebase/user/useUserList";
import { useCreateShift } from "../../../hooks/firebase/manager/useCreateShift";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
import CreateShiftModal from "../../templates/Modal/CreateShift_manager";
import CreateStaff from "./CreateStaff";
import { useAuth } from "../../../hooks/firebase/useUserAuth";

export default function UsersList() {
  const { user } = useAuth();
  const { createShift } = useCreateShift();
  const { handleChangeTime, rsvData, selectTeacher } = useSelectReserve();
  const { usersList, deleteTeacher, loadStaffList } = useStaffList();
  const { handleOpen3 } = useHandle();
  React.useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    loadStaffList();
  }, [process.browser, user]);
  return (
    <>
      <React.Fragment>
        <Box ml={3}>
          <Title>スタッフ一覧</Title>
        </Box>
        <Box display="flex" flexWrap="wrap">
          {usersList &&
            usersList.map((index) => (
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
                              image={index.staffImageURL}
                              alt="Icon"
                            />
                          </Box>
                        </Grid>
                        <Box display="flex" justifyContent="center">
                          <IconButton
                            onClick={() => {
                              handleOpen3();
                              selectTeacher(index);
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
                            {`氏名 : ${index.userName}`}
                          </Typography>
                          <Tooltip title="ユーザーを削除" arrow>
                            <IconButton
                              onClick={(e) => deleteTeacher(e, index.id)}
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
                          </Tooltip>
                        </Box>
                      </CardContent>
                    </Box>
                  </Grid>
                </Box>
                <CreateShiftModal
                  teacher={rsvData.teacherName}
                  time={rsvData.time}
                  changeSelect={handleChangeTime}
                  createShift={(e) =>
                    createShift(
                      e,
                      rsvData.teacherName,
                      rsvData.time,
                      console.log("シフト提出"),
                      rsvData.teacherId
                    )
                  }
                />
              </>
            ))}
        </Box>
        <CreateStaff />
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
