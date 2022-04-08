import React, { useState, FC } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";

import Header2 from "../../../components/templates/Header3";
import { useSignUp } from "../../../hooks/user/useUserList";
import { useAlert } from "../../../hooks/alert/useAlert";
import Success from "../../../components/atoms/Alert/Success";
import Error from "../../../components/atoms/Alert/Error";
import Already from "../../../components/templates/Sign/AlreadyUser";
import SignIn from "../../../components/templates/Sign/Sign_in";
import SignInButton from "../../../components/templates/Sign/SignInButton";

const SignUpPage: FC = () => {
  const theme = createTheme();
  const { errMsg, successMsg } = useAlert();
  const { loadSingUp } = useSignUp();
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
                loadSingUp(event, email, password, "/user/login/teacher/")
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
        {successMsg && successMsg == true && <Success>登録しました</Success>}
      </ThemeProvider>
    </>
  );
};
export default SignUpPage;
