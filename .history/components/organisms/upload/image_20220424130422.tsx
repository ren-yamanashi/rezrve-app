import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { createMedia } from "@artsy/fresnel";
import { useTeacher } from "../../../hooks/firebase/user/useUserList";
// inFile
import { UploadImage } from "../../../hooks/firebase/user/useUpload";
import CardComponent from "../../atoms/Card/CardComponent2";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import FieldTx from "../../atoms/Text/TextField";
import { useRouter } from "next/router";
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
  const [name, setName] = useState<string>("");
  const { usersList, userName, loadTeacher } = useTeacher();
  const { user_query, loadUser_query } = useSelectUser_query();
  const { user } = useAuth();
  const {
    file,
    sending,
    loading,
    handleChange,
    uploadFiles,
    changeDisplayName,
  } = UploadImage();
  const router = useRouter();
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    loadUser_query(user?.uid);
  }, [process.browser, user]);
  return (
    <>
      <MediaContextProvider>
        <React.Fragment>
          <Box textAlign="center">
            <Box mb={3}>
              <Grid xs={12} sm={20} md={20}>
                <CardComponent>
                  {usersList &&
                    usersList.map((item) =>
                      item.userName !== null ? (
                        <Typography sx={{ fontSize: 20, mx: "auto" }}>
                          {`氏名: ${item.userName}`}
                        </Typography>
                      ) : (
                        <Typography
                          sx={{ fontSize: 20, mx: "auto", color: "red" }}
                        >
                          {`氏名を入力してください`}
                        </Typography>
                      )
                    )}
                  <Box component="form" noValidate>
                    <Box display="flex" alignItems="right" mx="5%">
                      <Grid xs={20} sm={20} md={20}>
                        <FieldTx
                          style={{ mx: "auto" }}
                          label={"名前を変更"}
                          changeEv={(e) => setName(e.target.value)}
                        />
                      </Grid>
                      {loading && loading == true ? (
                        <Grid xs={6} sm={4} md={1}>
                          <PrimaryBtn
                            click={() => loadTeacher()}
                            style={{ my: 3, ml: 2 }}
                            buttonText={"確認"}
                          />
                        </Grid>
                      ) : (
                        <Grid xs={6} sm={4} md={1}>
                          <PrimaryBtn
                            click={(e) => changeDisplayName(e, name)}
                            style={{ my: 3, ml: 2 }}
                            buttonText={"更新"}
                          />
                        </Grid>
                      )}
                    </Box>
                  </Box>
                </CardComponent>
              </Grid>
            </Box>
            <Box mb={3}>
              <Grid xs={12} sm={20} md={20}>
                <CardComponent>
                  <Box textAlign="center">
                    <Typography sx={{ fontSize: 20, mx: "auto" }}>
                      {`メールアドレス: ${user_query?.email}`}
                    </Typography>
                  </Box>
                </CardComponent>
              </Grid>
            </Box>
          </Box>
          <Box textAlign="center" mb={3}>
            <Grid xs={12} sm={20} md={20}>
              <CardComponent>
                <Grid item xs={12} sm={14} lg={20} md={20}>
                  <CardMedia
                    component="img"
                    sx={{
                      borderRadius: "10%",
                      width: "90%",
                      margin: "auto",
                    }}
                    image={user_query?.staffImageURL}
                    alt="Icon"
                  />
                </Grid>
                <Box
                  component="form"
                  noValidate
                  onSubmit={(e) => uploadFiles(e)}
                  m="center"
                >
                  <Button variant="contained" sx={{ mt: 3, mb: 2, mx: "auto" }}>
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
                  <Box>
                    {sending == false ? (
                      <Button onClick={() => router.reload()} sx={{ ml: 1 }}>
                        リロードして確認
                      </Button>
                    ) : (
                      <Button type="submit" sx={{ ml: 1 }}>
                        ダウンロード
                      </Button>
                    )}
                  </Box>
                </Box>
              </CardComponent>
            </Grid>
          </Box>
        </React.Fragment>
        <ToastContainer />
      </MediaContextProvider>
    </>
  );
};

export default UploadFile;
