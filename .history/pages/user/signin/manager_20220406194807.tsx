import React, { useState, FC } from "react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Link from "next/link";
// import My File
import { useSignUp } from "../../../hooks/user/useUserList";
import Header2 from "../../../components/templates/Header3";
import AlertComponent from "../../../components/atoms/Alert/Alert";
import { useAlert } from "../../../hooks/alert/useAlert";
import Success from "../../../components/atoms/Alert/Success";
import Error from "../../../components/atoms/Alert/Error";
import Already from "../../../components/templates/Sign/AlreadyUser";
import SignIn from "../../../components/templates/Sign/Sign_in";
import SignInButton from "../../../components/templates/Sign/SignInButton";

const SignUpPage: FC = () => {
  const theme = createTheme();
  const { errMsg, successMsg } = useAlert();
  const { loadSingUp, loginError } = useSignUp();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <>
      <Header2 />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
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
            <SignIn />
            <Box
              component="form"
              noValidate
              onSubmit={(event) =>
                loadSingUp(event, email, password, "/user/login/manager")
              }
              sx={{ mt: 1 }}
            >
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
              <Already />
            </Box>
          </Box>
        </Container>
        {errMsg && errMsg == true && (
          <Error>アカウント取得に失敗しました</Error>
        )}
        {loginError == false && successMsg == true && (
          <Success>登録しました</Success>
        )}
      </ThemeProvider>
    </>
  );
};
export default SignUpPage;
