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
import { Input, Button } from "@mui/material";
// import my file
import Modals from "../../components/atoms/Modal/Modal2";
import Title_15 from "../../components/atoms/Text/Title_15";
import Header3 from "../../components/templates/Header/Header3";
import SignInButton from "../../components/atoms/Sign/SignInButton";
import { UploadImage } from "../../hooks/firebase/user/useUpload";
import { useJoin } from "../../hooks/firebase/user/useSign";
import { Query } from "../../models/router_query";
import { useLoading } from "../../hooks/useLoading";
import { useSignOut } from "../../hooks/firebase/user/useSign";
import { usePrismaUser } from "../../hooks/prisma/useUser";

const CreateStaffModal = (props) => {
  const router = useRouter();
  const query = router.query as Query;
  const theme = createTheme();
  const { loading } = useLoading();
  const { joinCompony } = useJoin();
  const { loadSingOut } = useSignOut();
  const { createStaff } = usePrismaUser();
  const { file, handleChange, url, uploadStoreImage } = UploadImage();
  const [data, setData] = React.useState({
    email: "",
    password: "",
    password2: "",
    id: "",
    companyId: query.id,
    name: "",
    staffImageUrl: url,
  });
  return (
    <>
      <Header3 />
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
              ????????????????????????
            </Typography>
            <Title_15
              fontSize={12}
              textTitle={"?????????????????????????????????????????????????????????????????????"}
            />
            <Box
              component="form"
              noValidate
              onSubmit={(e) => {
                console.log(url);
                createStaff(e, data);
                joinCompony(e, data.email, data.password, data.password2);
                // .then(props.loadOpen);
                loadSingOut().then(() =>
                  setTimeout(() => router.push("/login/store/"), 1000)
                );
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
                  <Title_15 fontSize={15} textTitle={"???????????????"} />
                </Box>
                <Box width={"60%"}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="name"
                    label="???????????????"
                    autoComplete="name"
                    id="outlined-basic"
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
                  <Title_15 fontSize={15} textTitle={"?????????????????????"} />
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
                  <Title_15 fontSize={15} textTitle={"???????????????"} />
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
                  <Title_15 fontSize={15} textTitle={"???????????????????????????"} />
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
              <Box display={"flex"} width={500} mb={3}>
                <Box
                  width={"40%"}
                  display={"flex"}
                  my={"auto"}
                  justifyContent={"center"}
                >
                  <Title_15 fontSize={15} textTitle={"????????????????????????"} />
                </Box>
                <Box width={"60%"}>
                  <Box display={"flex"} justifyContent={"center"}>
                    <Button variant="contained" sx={{ mt: 2, mx: "auto" }}>
                      {file == undefined ? "???????????????" : file?.name}
                      <Input
                        sx={{
                          opacity: 0,
                          appearance: "none",
                          position: "absolute",
                        }}
                        type="file"
                        onChange={handleChange}
                      />
                    </Button>
                  </Box>
                  <Box display={"flex"} justifyContent={"center"}>
                    {loading == true ? (
                      <Button sx={{ fontSize: 12 }}>?????????????????????...</Button>
                    ) : (
                      <Button
                        onClick={(e) =>
                          uploadStoreImage(e).then(() =>
                            setData({ ...data, staffImageUrl: url })
                          )
                        }
                        sx={{ fontSize: 12 }}
                      >
                        ??????????????????
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
              <SignInButton />
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default CreateStaffModal;
