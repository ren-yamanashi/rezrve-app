import React, { useState, FC, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Title_15 from "../../atoms/Text/Title_15";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { SelectChangeEvent } from "@mui/material";
import { useSignUp, useJoin } from "../../../hooks/firebase/user/useUserList";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import Select from "react-select";
import Header2 from "../../templates/Header/Header3";
import InputLabel from "@mui/material/InputLabel";
import Already from "../../atoms/Sign/AlreadyUser";
import SignIn from "../../atoms/Sign/Sign_in";
import SignInButton from "../../atoms/Sign/SignInButton";
import { ToastContainer } from "react-toastify";
import Footer from "../Footer/Footer";

const AddStore = () => {
  const theme = createTheme();
  const inputRef = useRef(null);
  const { loginCompony, joinCompony } = useJoin();
  const [time, setTime] = useState({ start: 0, end: 0 });
  const [data, setData] = useState({
    email: "",
    password: "",
    password2: "",
    id: "",
    error: false,
  });
  const options = [
    { value: 1, label: "1:00" },
    { value: 2, label: "2:00" },
    { value: 3, label: "3:00" },
    { value: 4, label: "4:00" },
    { value: 5, label: "5:00" },
    { value: 6, label: "6:00" },
    { value: 7, label: "7:00" },
    { value: 8, label: "8:00" },
    { value: 9, label: "9:00" },
    { value: 10, label: "10:00" },
    { value: 11, label: "11:00" },
    { value: 12, label: "12:00" },
    { value: 13, label: "13:00" },
    { value: 14, label: "14:00" },
    { value: 15, label: "15:00" },
    { value: 16, label: "16:00" },
    { value: 17, label: "17:00" },
    { value: 18, label: "18:00" },
    { value: 19, label: "19:00" },
    { value: 20, label: "20:00" },
    { value: 21, label: "21:00" },
    { value: 22, label: "22:00" },
    { value: 23, label: "23:00" },
    { value: 24, label: "24:00" },
  ];
  const handleChangeStart = (e) => {
    setTime({ ...time, start: e.value });
  };
  const handleChangeEnd = (e) => {
    setTime({ ...time, end: e.value });
  };
  const timeArr = [];
  for (let index = time.start; index <= time.end; index++) {
    timeArr.push(index);
  }
  console.log(timeArr);
  return (
    <>
      <Header2 />
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
          <CssBaseline />
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5" fontFamily="Georgia">
              店舗詳細登録
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={(e) => {
                joinCompony(
                  e,
                  data.email,
                  data.password,
                  data.password2,
                  data.id
                ).then(() =>
                  loginCompony(e, data.email, data.password, data.id)
                );
              }}
              sx={{ mt: 1 }}
            >
              <Box display={"flex"} width={500}>
                <Box
                  width={"40%"}
                  display={"flow-root"}
                  my={"auto"}
                  justifyContent={"center"}
                >
                  <Title_15 fontSize={15} textTitle={"店舗名"} />
                </Box>
                <Box width={"60%"}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="name"
                    label="店舗名"
                    id="outlined-basic"
                    helperText={inputRef?.current?.validationMessage}
                    onChange={(e) => {
                      setData({ ...data, id: e.target.value });
                    }}
                  />
                </Box>
              </Box>
              <Box display={"flex"} width={500} mb={2}>
                <Box
                  width={"40%"}
                  display={"flow-root"}
                  my={"auto"}
                  justifyContent={"center"}
                >
                  <Title_15 fontSize={15} textTitle={"店舗住所"} />
                </Box>
                <Box width={"60%"}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="name"
                    label="住所"
                    id="outlined-basic"
                    autoComplete="Address"
                    helperText={inputRef?.current?.validationMessage}
                    onChange={(e) => {
                      setData({ ...data, id: e.target.value });
                    }}
                  />
                </Box>
              </Box>
              <Box display={"flex"} width={500}>
                <Box
                  width={"40%"}
                  display={"flow-root"}
                  my={"auto"}
                  justifyContent={"center"}
                >
                  <Box display={"flow-root"}>
                    <Title_15 fontSize={15} textTitle={"営業時間"} />
                    <Title_15
                      fontSize={10}
                      textTitle={"※1時間単位での予約となります"}
                    />
                  </Box>
                </Box>
                <Box width={"60%"} display={"flex"}>
                  <Box display={"flex"} justifyContent={"center"} my={"auto"}>
                    <Select options={options} onChange={handleChangeStart} />
                    <Title_15
                      fontSize={15}
                      textTitle={"〜"}
                      style={{ mx: 2, my: "auto" }}
                    />
                    <Select options={options} onChange={handleChangeEnd} />
                  </Box>
                </Box>
              </Box>
              <Box textAlign="center">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 4,
                    width: "30%",
                    alignItems: "center",
                    fontFamily: "Georgia",
                  }}
                >
                  登録
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};
export default AddStore;
