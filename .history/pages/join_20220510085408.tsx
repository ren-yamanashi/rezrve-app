import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Title_15 from "../components/atoms/Text/Title_15";

import { useJoin } from "../hooks/firebase/user/useSign";
import Header2 from "../components/templates/Header/Header3";
import Already from "../components/atoms/Sign/AlreadyUser";
import SignInButton from "../components/atoms/Sign/SignInButton";
import { ToastContainer } from "react-toastify";
import Footer from "../components/templates/Footer/Footer";
import { useRouter } from "next/router";
import prisma from "../lib/prisma";
import { GetStaticProps } from "next";

type Data = {
  email: string;
  password: string;
  password2: string;
  id: string;
  error: boolean;
};

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.user.findMany();
  const posts = JSON.parse(JSON.stringify(feed));
  return { props: { posts } };
};
type Props = {
  posts: PostProps[];
};

const Join_compony: React.FC = (props) => {
  const router = useRouter();
  const theme = createTheme();
  const inputRef = React.useRef(null);
  const { joinCompony } = useJoin();
  const [data, setData] = React.useState<Data>({
    email: "",
    password: "",
    password2: "",
    id: "",
    error: false,
  });

  return (
    <>
      <Header2 />
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
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
              店舗新規登録
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={(e) => {
                try {
                  // joinCompony(e, data.email, data.password, data.password2);
                  // router.push(`/add/${data.id}/`);
                  console.log(props.post);
                } catch (error) {
                  console.log(error);
                }
              }}
              sx={{ mt: 1 }}
            >
              <Box display={"flex"} width={500}>
                <Box
                  width={"40%"}
                  display={"flex"}
                  my={"auto"}
                  justifyContent={"center"}
                >
                  <Title_15 fontSize={15} textTitle={"店舗ID (英数字)"} />
                </Box>
                <Box width={"60%"}>
                  <TextField
                    margin="normal"
                    error={data.error}
                    inputProps={{ pattern: "^[a-zA-Z0-9_]+$" }}
                    inputRef={inputRef}
                    required
                    fullWidth
                    name="name"
                    label="店舗ID"
                    id="outlined-basic"
                    helperText={inputRef?.current?.validationMessage}
                    onChange={(e) => setData({ ...data, id: e.target.value })}
                  />
                </Box>
              </Box>
              <Box display={"flex"} width={500}>
                <Box
                  width={"40%"}
                  display={"flex"}
                  my={"auto"}
                  justifyContent={"center"}
                >
                  <Title_15 fontSize={15} textTitle={"メールアドレス"} />
                </Box>
                <Box width={"60%"}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                </Box>
              </Box>
              <Box display={"flex"} width={500}>
                <Box
                  width={"40%"}
                  display={"flex"}
                  my={"auto"}
                  justifyContent={"center"}
                >
                  <Title_15 fontSize={15} textTitle={"パスワード"} />
                </Box>
                <Box width={"60%"}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                </Box>
              </Box>
              <Box display={"flex"} width={500}>
                <Box
                  width={"40%"}
                  display={"flex"}
                  my={"auto"}
                  justifyContent={"center"}
                >
                  <Title_15 fontSize={15} textTitle={"パスワード（確認）"} />
                </Box>
                <Box width={"60%"}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) =>
                      setData({ ...data, password2: e.target.value })
                    }
                  />
                </Box>
              </Box>
              <SignInButton />
              <Divider />
              <Already linkTitle={"/login/store/"} />
            </Box>
          </Box>
        </Container>
        <ToastContainer />
      </ThemeProvider>
      <Footer />
    </>
  );
};
export default Join_compony;
