import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";

import { useSignUp } from "../../../hooks/firebase/user/useUserList";
import Header2 from "../Header/Header3";
import Already from "../../atoms/Sign/AlreadyUser";
import SignIn from "../../atoms/Sign/Sign_in";
import SignInButton from "../../atoms/Sign/SignInButton";
import { ToastContainer } from "react-toastify";
import Footer from "../Footer/Footer";

//OK
const SignUpPage_Store = () => {
  const theme = createTheme();
  const { loadSingUp } = useSignUp();
  const [data, setData] = React.useState({ email: "", password: "" });
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
                loadSingUp(event, data.email, data.password, "/login/manager/")
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
                onChange={(e) => setData({ ...data, email: e.target.value })}
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
                onChange={(e) => setData({ ...data, password: e.target.value })}
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
export default SignUpPage_Store;
