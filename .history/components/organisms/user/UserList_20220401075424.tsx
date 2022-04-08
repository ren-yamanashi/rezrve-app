import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { blue, grey, teal } from "@mui/material/colors";
import { createMedia } from "@artsy/fresnel";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { ToastContainer } from "react-toastify";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { useHandle } from "../../../hooks/handle/useHandle";
import Title from "../../atoms/Title";
import { Tooltip } from "@mui/material";
import { useTeacherList } from "../../../hooks/user/useUserList";
import { useCreateShift } from "../../../hooks/manager/shift/useCreateShift";
import CreateShiftModal from "../../templates/Modal/CreateShift";

//MediaQuery設定
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 700,
    lg: 860,
    xl: 1200,
  },
});
//Modalのスタイル（予約登録確認画面）
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 370,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
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

//ユーザーリストの作成　名前に管理者があればユーザーの削除が可能。 メアドに @bee が入っていればシフトの登録が可能
export default function UsersList() {
  const [value, setValue] = useState<Date | null>(new Date());
  const { createShift } = useCreateShift();
  const { usersList, deleteTeacher } = useTeacherList();
  const { handleOpen3 } = useHandle();
  const [teacher, setTeacher] = useState("");
  const [userNum, setUserNum] = useState("");
  const [err, setErr] = useState<boolean>(false);
  const { user } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const [age, setAge] = React.useState<number | string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <>
      <React.Fragment>
        <Box ml={3}>
          <Title>講師一覧</Title>
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
                              image={index.url}
                              alt="Icon"
                            />
                          </Box>
                        </Grid>
                        <Box display="flex" justifyContent="center">
                          <IconButton
                            onClick={() => {
                              handleOpen3();
                              setTeacher(index.userName);
                              setUserNum(index.id);
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
                            {`講師名 : ${index.userName}`}
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
                  teacher={teacher}
                  time={age}
                  changeSelect={handleChange}
                  createShift={(e) =>
                    createShift(e, teacher, age, console.log("シフト提出"))
                  }
                />
              </>
            ))}
        </Box>
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
