import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Modals from "../../atoms/Modal/Modal2";
import { useHandle } from "../../../hooks/useHandle";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Title_15 from "../../atoms/Text/Title_15";
import { useJoin } from "../../../hooks/firebase/user/useUserList";
import SignInButton from "../../atoms/Sign/SignInButton";
import { UploadImage } from "../../../hooks/firebase/user/useUpload";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

const SetStaffData = (props) => {
  const { onOpen2, handleClose2 } = useHandle();
  const router = useRouter();
  const theme = createTheme();
  const { file, handleChange, url, uploadStoreImage, changeStaffData } =
    UploadImage();
  const { joinCompony } = useJoin();
  const [data, setData] = React.useState({
    email: "",
    password: "",
    password2: "",
    id: "",
    error: false,
  });
  return (
    <>
      <Modal
        open={onOpen2}
        onClose={handleClose2}
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
                  スタッフ情報登録
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={(e) => {
                    changeStaffData(e, props.queryID, props.userName, url);
                  }}
                  sx={{ mt: 1 }}
                >
                  <Box display={"flex"} width={500}>
                    <Box
                      width={"40%"}
                      display={"flow-root"}
                      my={"auto"}
                      justifyContent={"center"}
                    >
                      <Title_15 fontSize={15} textTitle={"店舗名"} />
                    </Box>
                    <Box width={"60%"}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="name"
                        label="店舗名"
                        id="outlined-basic"
                        helperText={inputRef?.current?.validationMessage}
                        onChange={(e) => {
                          setData({ ...data, name: e.target.value });
                        }}
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
            <ToastContainer />
          </ThemeProvider>
        </Modals>
      </Modal>
    </>
  );
};

export default SetStaffData;
