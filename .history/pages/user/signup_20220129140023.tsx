import React, { useState, FC, useEffect, FormEvent } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  collection,
  getFirestore,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Link from "next/link";
//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import Header2 from "../../components/templates/Header2";

/**===========================================================
             *@param event サインイン画面を作成
 ============================================================*/
const SignUpPage: FC = () => {
  const theme = createTheme();
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const auth = getAuth();
  const db = getFirestore();
  const { user } = useAuth();

  /**==============
   * @param event ユーザーがサインインしていたら、ログイン画面へ強制遷移
   ================*/
  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     user && router.push(`/home/${user?.uid}`);
  //   });
  // }, []);
  /**===============
 * @param event 新規登録
================ */
  const SignUp = async (event: any) => {
    event.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push("/user/login");
      })
      .catch((error) => {
        alert(error.message);
        console.error(error);
      });
    await updateProfile(auth.currentUser, {
      displayName: userName,
      photoURL: "https://source.unsplash.com/random",
    }).then(() => {
      console.log("成功しました!!");
      setUserName("");
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
                autoComplete="current-user"
                onChange={(e) => setUserName(e.target.value)}
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
                <Button>
                  <Link href="/">パスワードを忘れた</Link>
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};
export default SignUpPage;
