import React, { useState, FC } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";

import Header2 from "../../templates/Header/Header3";
import { ToastContainer } from "react-toastify";
import { useSignUp } from "../../../hooks/user/useUserList";
import Already from "../../atoms/Sign/AlreadyUser";
import SignIn from "../../atoms/Sign/Sign_in";
import SignInButton from "../../atoms/Sign/SignInButton";
import Footer from "../Footer/Footer";

const SignUpPage_Teacher = () => {
  const theme = createTheme();
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
                loadSingUp(event, email, password, "/login/teacher/")
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
              <Already linkTitle={"/login/teacher/"} />
            </Box>
          </Box>
        </Container>
        <ToastContainer />
      </ThemeProvider>
      <Footer />
    </>
  );
};
export default SignUpPage_Teacher;
