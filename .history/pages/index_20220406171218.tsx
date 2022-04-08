import React, { useState, FC } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Link from "next/link";
// import My File
import Header2 from "../components/templates/Header3";
import SignInComponent from "../components/templates/Sign/Sign_in";
import { useSignUp } from "../hooks/user/useUserList";
import { useAlert } from "../hooks/alert/useAlert";
import AlertComponent from "../components/atoms/Alert/Alert";
import Success from "../components/atoms/Alert/Success";
import Error from "../components/atoms/Alert/Error";

const SignUpPage: FC = () => {
  const theme = createTheme();
  const router = useRouter();
  const { errMsg, showErrorMessage, successMsg, showSuccessMessage } =
    useAlert();
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
            <SignInComponent />
            <Box
              component="form"
              noValidate
              onSubmit={(event) => {
                loadSingUp(event, email, password, router.push("/user/login/"));
              }}
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
                  Sign In
                </Button>
              </Box>
              <Divider />
              <Box textAlign="center" mt={1}>
                <Typography>
                  アカウントをお持ちの方は
                  <Button>
                    <Link href="/user/login">こちら</Link>
                  </Button>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
        {loginError && loginError == true && (
          <AlertComponent>既にアカウントをお持ちです</AlertComponent>
        )}
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
