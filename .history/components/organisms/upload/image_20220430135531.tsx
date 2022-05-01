import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { createMedia } from "@artsy/fresnel";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { blue } from "@mui/material/colors";
// inFile
import { UploadImage } from "../../../hooks/firebase/user/useUpload";
import { useLoading } from "../../../hooks/useLoading";
import Title_15 from "../../atoms/Text/Title_15";
import { useSelectUser_query } from "../../../hooks/firebase/user/useUserList";
import { useAuth } from "../../../hooks/firebase/useUserAuth";
// Create Media
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 1000,
    xl: 1200,
  },
});
const UploadFile = () => {
  const inputRef = React.useRef(null);
  const { user_query } = useSelectUser_query();
  const theme = createTheme();
  const { startLoading, completeLoading, loading } = useLoading();
  const {
    file,
    handleChange,
    url,
    uploadStoreImage,
    changeStaffData,
    imageData,
    getFiles,
  } = UploadImage();
  const [data, setData] = React.useState({
    name: "",
    error: false,
  });
  return (
    <>
      <MediaContextProvider>
        <React.Fragment>
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
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{ fontFamily: "Georgia", mb: 3 }}
                >
                  スタッフ情報変更
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={(e) =>
                    changeStaffData(
                      e,
                      user_query?.companyId,
                      data.name,
                      imageData.url,
                      user_query?.times,
                      "staff"
                    )
                  }
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
                        label=""
                        id="outlined-basic"
                        helperText={inputRef?.current?.validationMessage}
                        onChange={(e) => {
                          setData({ ...data, name: e.target.value });
                        }}
                      />
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
                        <Title_15 fontSize={15} textTitle={"店舗画像"} />
                        <Title_15
                          fontSize={10}
                          textTitle={"※アイコンとして表示されます"}
                        />
                      </Box>
                    </Box>
                    <Box width={"60%"}>
                      <Box display={"flex"} justifyContent={"center"}>
                        <Button variant="contained" sx={{ mt: 2, mx: "auto" }}>
                          {imageData.file == undefined
                            ? "画像を選択"
                            : "ダウンロードしてください"}
                          <Input
                            sx={{
                              opacity: 0,
                              appearance: "none",
                              position: "absolute",
                            }}
                            type="file"
                            onChange={(e) => getFiles(e)}
                          />
                        </Button>
                      </Box>
                      <Box display={"flex"} justifyContent={"center"}>
                        {loading == true ? (
                          <>
                            <Box sx={{ fontSize: 12, color: blue[500] }}>
                              ダウンロード中...
                            </Box>
                          </>
                        ) : (
                          <Button
                            onClick={(e) => {
                              startLoading();
                              uploadStoreImage(e).then(() => {
                                setTimeout(() => completeLoading(), 500);
                              });
                            }}
                            sx={{ fontSize: 12 }}
                          >
                            ダウンロード
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Box>
                  <Box textAlign="center">
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 2,
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
        </React.Fragment>
        <ToastContainer />
      </MediaContextProvider>
    </>
  );
};

export default UploadFile;
