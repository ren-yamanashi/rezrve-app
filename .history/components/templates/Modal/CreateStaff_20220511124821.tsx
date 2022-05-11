import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
// import my file
import Modals from "../../atoms/Modal/Modal2";
import Title_15 from "../../atoms/Text/Title_15";
import SignInButton from "../../atoms/Sign/SignInButton";
import { userProps } from "../SignUp/join";
import { useJoin } from "../../../hooks/firebase/user/useSign";
import { Query } from "../../../models/router_query";

//OK
const CreateStaffModal = (props) => {
  const router = useRouter();
  const query = router.query as Query;
  const theme = createTheme();
  const { joinCompony } = useJoin();
  const [data, setData] = React.useState({
    email: "",
    password: "",
    password2: "",
    id: "",
    companyId: query.id,
  });
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await fetch("/api/post/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };
  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Modals>
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
                  新規スタッフ登録
                </Typography>
                <Title_15
                  fontSize={12}
                  textTitle={"※登録が完了すると、店舗ログイン画面に戻ります"}
                />
                <Box
                  component="form"
                  noValidate
                  onSubmit={(e) => {
                    submitData(e);
                    // joinCompony(e, data.email, data.password, data.password2);
                    // .then(props.loadOpen);
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
                      <Title_15
                        fontSize={15}
                        textTitle={"パスワード（確認）"}
                      />
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
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </Modals>
      </Modal>
    </>
  );
};

export default CreateStaffModal;
