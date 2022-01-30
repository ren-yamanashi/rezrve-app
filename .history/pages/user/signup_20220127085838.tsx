import React, { useState, FC, useEffect, FormEvent } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import {
  collection,
  getFirestore,
  addDoc,
  orderBy,
  query,
  where,
  getDocs,
  startAt,
  endAt,
  Timestamp,
} from "firebase/firestore";

/**===========================================================
             *@param event サインイン画面を作成
 ============================================================*/
const SignUpPage: FC = () => {
  const theme = createTheme();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [sending, setSending] = useState(false);
  const [userName, setUserName] = useState<string>("");
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
  /**===============
 * @param event 新規登録
================ */
  const SignUp = async (event: any) => {
    event.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        addDoc(collection(db, "users"), {
          email,
          password,
          userName,
        });
        setSending(false);
        toast.success("登録が完了しました", {
          position: "bottom-left",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={SignUp} sx={{ mt: 1 }}>
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="userName"
                label="Name"
                type="name"
                id="userName"
                autoComplete="current-userName"
                onChange={(e) => setUserName(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default SignUpPage;
