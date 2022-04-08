import React, { useState, FC } from "react";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockIcon from "@mui/icons-material/Lock";
import Divider from "@mui/material/Divider";
import { ToastContainer } from "react-toastify";
// import my File
import { useAuth } from "../../../hooks/useUserAuth";
import { useLogin } from "../../../hooks/user/useUserList";
import AlertComponent from "../../../components/atoms/Alert";
import Header2 from "../../../components/templates/Header3";

const LoginPage: FC = () => {
  const theme = createTheme();
  const { user } = useAuth();
  const { loadLoginUser, loadResetPassword, loginUserError } = useLogin();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5" fontFamily="Georgia">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={(event) =>
                loadLoginUser(
                  event,
                  email,
                  password,
                  router.push(`/reserve/manager/${user?.uid}`)
                )
              }
              sx={{ mt: 1 }}
            >
              <Box sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => setEmail(e.currentTarget.value)}
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
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
                <Box textAlign="center">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 4,
                      width: "30%",
                      alignItems: "center",
                      fontFamily: "Georgia",
                    }}
                  >
                    Login
                  </Button>
                </Box>
                <Divider />
                <Box textAlign="center" mt={1}>
                  <Button onClick={(event) => loadResetPassword(event, email)}>
                    パスワードを忘れた / パスワード変更
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
        {loginUserError && loginUserError == true && (
          <AlertComponent>
            アドレスまたはパスワードに誤りがあります
          </AlertComponent>
        )}
      </ThemeProvider>
      <ToastContainer />
    </>
  );
};
export default LoginPage;
