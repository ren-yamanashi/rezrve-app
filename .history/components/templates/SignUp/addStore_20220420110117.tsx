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
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material";
import { useSignUp, useJoin } from "../../../hooks/firebase/user/useUserList";
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
  const { loadSingUp } = useSignUp();
  const [time, setTime] = useState({ start: "", end: "" });
  const handleChangeStart = (event: SelectChangeEvent) => {
    setTime({ ...time, start: event.target.value });
  };
  const handleChangeEnd = (event: SelectChangeEvent) => {
    setTime({ ...time, end: event.target.value });
  };
  const timeArr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];
  const [data, setData] = useState({
    email: "",
    password: "",
    password2: "",
    id: "",
    error: false,
  });

  const handleChange = () => {
    if (inputRef.current) {
      const ref = inputRef.current;
      if (!ref.validity.valid) {
        setData({ ...data, error: true });
      } else {
        setData({ ...data, error: false });
      }
    }
  };

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
              <Box display={"flex"} width={500}>
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
                  <FormControl sx={{ mt: 1, minWidth: 80 }}>
                    <InputLabel id="demo-simple-select-label">
                      営業開始時間
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={time.start}
                      onChange={handleChangeStart}
                      autoWidth
                      label="時間"
                    >
                      {timeArr.map((item) => (
                        <>
                          <MenuItem value={item}>{`${item}:00`}</MenuItem>
                        </>
                      ))}
                    </Select>
                  </FormControl>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    my={"auto"}
                    mx={2}
                  >
                    <Title_15 fontSize={15} textTitle={"〜"} />
                  </Box>
                  <FormControl sx={{ mt: 1, minWidth: 80 }}>
                    <InputLabel id="demo-simple-select-label">
                      営業終了時間
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={time.end}
                      onChange={handleChangeEnd}
                      autoWidth
                      label="時間"
                    >
                      {timeArr.map((item) => (
                        <>
                          <MenuItem value={item}>{`${item}:00`}</MenuItem>
                        </>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};
export default AddStore;
