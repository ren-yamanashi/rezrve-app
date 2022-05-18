import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Input, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { blue } from "@mui/material/colors";
// import myFile
import Title_15 from "../../components/atoms/Text/Title_15";
import Header2 from "../../components/templates/Header/Header3";
import { UploadImage } from "../../hooks/firebase/user/useUpload";
import { useAuth } from "../../hooks/firebase/useUserAuth";
import { Query } from "../../models/router_query";
import { usePrismaUser } from "../../hooks/prisma/useUser";
import { useLoading } from "../../hooks/useLoading";
import { useSignOut } from "../../hooks/firebase/user/useSign";

const AddStore: React.FC = () => {
  const theme = createTheme();
  const router = useRouter();
  const query = router.query as Query;
  const inputRef = React.useRef(null);
  const { user } = useAuth();
  const { loading } = useLoading();
  const { updateUser } = usePrismaUser();
  const { changeDisplayName } = UploadImage();
  const { loadSingOut } = useSignOut();
  const { file, handleChange, url, uploadStoreImage } = UploadImage();
  const [data, setData] = React.useState({
    id: user?.uid,
    userName: "",
    role: "staff",
    url: url,
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
            <Typography component="h1" variant="h5" fontFamily="Georgia">
              スタッフ詳細登録
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={(e) => {
                try {
                  changeDisplayName(e, data.userName);
                  console.log(data.url);
                  updateUser(query.uid, data);
                  //   loadSingOut();
                  //   setTimeout(() => router.push("/login/store/"), 1000);
                } catch (error) {
                  console.error(error);
                }
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
                  <Title_15 fontSize={15} textTitle={"スタッフ名"} />
                </Box>
                <Box width={"60%"}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="name"
                    label="Name"
                    id="outlined-basic"
                    helperText={inputRef?.current?.validationMessage}
                    onChange={(e) => {
                      setData({ ...data, userName: e.target.value });
                    }}
                  />
                </Box>
              </Box>
              <Box display={"flex"} width={500}>
                <Box
                  width={"40%"}
                  display={"flow-root"}
                  my={"auto"}
                  justifyContent={"center"}
                >
                  <Title_15 fontSize={15} textTitle={"プロフィール画像"} />
                </Box>
                <Box width={"60%"}>
                  <Box display={"flex"} justifyContent={"center"}>
                    <Button variant="contained" sx={{ mt: 2, mx: "auto" }}>
                      {file == undefined ? "画像を選択" : file?.name}
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
                      <Button sx={{ fontSize: 12 }}>ダウンロード中...</Button>
                    ) : (
                      <Button
                        onClick={(e) =>
                          uploadStoreImage(e).then(() =>
                            setData({ ...data, url: url })
                          )
                        }
                        sx={{ fontSize: 12 }}
                      >
                        ダウンロード
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
              <Box display={"flex"} width={500} mb={3}>
                <Box
                  width={"40%"}
                  display={"flow-root"}
                  my={"auto"}
                  justifyContent={"center"}
                >
                  <Box display={"flow-root"}>
                    <Title_15 fontSize={15} textTitle={"スタッフログインURL"} />
                  </Box>
                </Box>
                <Box width={"60%"}>
                  <Box display={"flex"} justifyContent={"center"}>
                    <Title_15
                      fontSize={15}
                      style={{
                        color: blue[600],
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      textTitle={`https://next-reserve-app.vercel.app/login/staff/`}
                    />
                  </Box>
                </Box>
              </Box>
              <Box textAlign="center">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 5,
                    mb: 4,
                    alignItems: "center",
                    fontFamily: "Georgia",
                  }}
                >
                  登録
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
};
export default AddStore;
