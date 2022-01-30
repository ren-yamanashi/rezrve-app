import React, { useState, FormEvent, FC, useEffect } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockIcon from "@mui/icons-material/Lock";
import {
  collection,
  getFirestore,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";

//内部インポート
import { useAuth } from "../../hooks/useUserAuth";

const LoginPage: FC = () => {
  const theme = createTheme();
  const { user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const auth = getAuth();
  const db = getFirestore();
  /**==============
   * @param event ユーザーがサインインしていたら、ログイン画面へ強制遷移
   ================*/
  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     user && router.push(`/reserve/${user?.uid}`);
  //   });
  // }, []);
  //ユーザー認証
  const Login = async (event: any) => {
    event.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setDoc(doc(db, "users", user.uid), {
          email,
          password,
          userName: `ユーザー${user.uid}`,
          id: user.uid,
          isAnonymous: user.isAnonymous,
        });
        router.push(`/reserve/${user?.uid}`);
      })
      .catch((error) => {
        alert(error.message);
        console.error(error);
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bg: " -webkit-linear-gradient(0deg, #4f6ef8, #4f85f8)",
              }}
            >
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" noValidate onSubmit={Login} sx={{ mt: 1 }}>
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default LoginPage;
