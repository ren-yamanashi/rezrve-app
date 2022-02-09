import React, { useState, FormEvent, FC, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockIcon from "@mui/icons-material/Lock";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import {
  collection,
  getFirestore,
  addDoc,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";

//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import Header2 from "../../components/templates/Header2";
import { browser } from "process";

const LoginPage: FC = () => {
  const theme = createTheme();
  const { user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [err, setErr] = useState<boolean>(false);
  const auth = getAuth();
  const db = getFirestore();
  /**==============
   * @param event ユーザーがサインインしていたら、ログイン画面へ強制遷移
   ================*/
  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     user && router.push(`/home/${user?.uid}`);
  //   });
  // }, []);
  //ユーザー認証
  const Login = async (event: any) => {
    event.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        {
          email.indexOf("@bee") !== -1
            ? router.push(`/home/${user?.uid}`)
            : router.push(`/home/students/${user?.uid}`);
        }
      })
      .catch((error) => {
        alert("メールアドレスまたはパスワードに誤りがあります");
        console.error(error);
      });
  };
  const resetPass = async (event) => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("メールを送信しました", {
          position: "bottom-left",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(() => {
        window.alert("正しいメールアドレスを入力してください");
      });
  };
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
                  <Button onClick={(event) => resetPass(event)}>
                    パスワードを忘れた / パスワード変更
                    {/* <Link href="/">パスワードを忘れた</Link> */}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
        {err == true && (
          <Box textAlign="center">
            <Grid xs={12} sm={15}>
              <Alert variant="filled" severity="error" sx={{ m: 3 }}>
                エラー : アドレスまたはパスワードに誤りがあります
                <Button
                  onClick={() => {
                    setErr(false);
                  }}
                  size="small"
                  sx={{ color: "red", bgcolor: "whitesmoke", m: 1 }}
                >
                  了解
                </Button>
              </Alert>
            </Grid>
          </Box>
        )}
      </ThemeProvider>
      <ToastContainer />
    </>
  );
};
export default LoginPage;
