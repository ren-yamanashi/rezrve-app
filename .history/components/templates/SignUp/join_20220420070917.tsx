import React, { useState, FC } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";

import { useSignUp } from "../../../hooks/firebase/user/useUserList";
import Header2 from "../../templates/Header/Header3";
import Already from "../../atoms/Sign/AlreadyUser";
import SignIn from "../../atoms/Sign/Sign_in";
import SignInButton from "../../atoms/Sign/SignInButton";
import { ToastContainer } from "react-toastify";
import Footer from "../Footer/Footer";

const Join_compony = () => {
  const theme = createTheme();
  const { loadSingUp } = useSignUp();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5" fontFamily="Georgia">
              店舗新規登録
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={(event) =>
                loadSingUp(event, email, password, "/login/manager/")
              }
              sx={{ mt: 1 }}
            >
              <Box display={"flex"} width={300}>
                <Box
                  width={"50%"}
                  display={"flex"}
                  my={"auto"}
                  justifyContent={"center"}
                >
                  <Typography component="h1" variant="h6" fontFamily="Georgia">
                    メールアドレス
                  </Typography>
                </Box>
                <Box width={"50%"}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Box>
              </Box>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <SignInButton />
              <Divider />
              <Already linkTitle={"/login/manager/"} />
            </Box>
          </Box>
        </Container>
        <ToastContainer />
      </ThemeProvider>
      <Footer />
    </>
  );
};
export default Join_compony;
