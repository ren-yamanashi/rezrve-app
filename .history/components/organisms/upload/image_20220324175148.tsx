import React, { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
  doc,
  runTransaction,
} from "firebase/firestore";
import TextField from "@mui/material/TextField";
import { browser } from "process";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { createMedia } from "@artsy/fresnel";
import { useTeacher } from "../../../hooks/user/useUserList";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import CardComponent from "../../atoms/CardComponent2";
import FieldTx from "../../atoms/Text/TextField";
import { Users } from "../../../models/Users";
import Title from "../../atoms/Title";
import AlertComponent from "../../atoms/Alert";
import { getAuth, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 1000,
    xl: 1200,
  },
});

//ユーザープロフィール画面　写真のアップロード、名前の設定が可能。※メールアドレスの変更はできない
export default function UploadFile() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(true);
  const [sending2, setSending2] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);
  const storage = getStorage();
  const { user } = useAuth();
  const { usersList, userName } = useTeacher();
  const router = useRouter();
  //コレクション設定
  function getCollections() {
    const db = getFirestore();
    return {
      db,
      userCollection: collection(db, "users"),
    };
  }
  /**=============
   * @param event 画像をFirebaseにアップロード
   *=============*/
  const onSubmit = async (event) => {
    event.preventDefault();
    if (image === "") {
      console.log("ファイルが選択されていません");
    }
    // アップロード処理
    setSending(true);
    const storageRef = ref(storage, "/images/" + file.name);
    const uploadTask = uploadBytes(storageRef, file);
    const { db, userCollection } = getCollections();
    const auth = getAuth();
    uploadTask.then((snapshot: any) => {
      //urlを取得
      getDownloadURL(storageRef).then((url) => {
        runTransaction(db, async (t: any) => {
          //ドキュメントをアップデート
          t.update(doc(userCollection, user.uid), {
            url: url,
          });
        });
        updateProfile(auth.currentUser, {
          photoURL: url,
        });
      });
      toast.success("アップロードが完了しました", {
        position: "bottom-left",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsLoading(false);
      setSending(false);
    });
  };
  /**=============
   * @param event displayNameを変更する処理
   *=============*/
  const onSubmit2 = async (event) => {
    event.preventDefault();
    //displayNameの変更
    const { db, userCollection } = getCollections();
    const auth = getAuth();
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      runTransaction(db, async (t: any) => {
        //ドキュメントをアップデート
        t.update(doc(userCollection, user.uid), {
          userName: name,
        });
      });
      toast.success("更新しました", {
        position: "bottom-left",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSending2(true);
    } catch (error) {
      setErr(true);
    } finally {
      setSending2(true);
    }
  };
  /**===========
   * @param event 画像をstateに保存する処理
   *===========*/
  function handleChange(event) {
    setFile(event.target.files[0]);
    setImage(file);
  }
  return (
    <>
      <MediaContextProvider>
        <React.Fragment>
          <Media at="sm">
            <Box textAlign="center">
              <Title>プロフィール</Title>
            </Box>
          </Media>
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
                  <Box component="form" noValidate onSubmit={onSubmit2}>
                    <Box display="flex" alignItems="right" mx="5%">
                      <Grid xs={20} sm={20} md={20}>
                        <FieldTx
                          style={{ mx: "auto" }}
                          label={"名前を変更"}
                          changeEv={(e) => setName(e.target.value)}
                        />
                      </Grid>
                      {sending2 == true ? (
                        <Grid xs={6} sm={4} md={1}>
                          <Button
                            onClick={() => router.reload()}
                            variant="contained"
                            sx={{ my: 2.5, ml: 2 }}
                          >
                            確認
                          </Button>
                        </Grid>
                      ) : (
                        <Grid xs={6} sm={4} md={1}>
                          <Box>
                            <Button
                              type="submit"
                              variant="contained"
                              sx={{ my: 2.5, ml: 2 }}
                            >
                              更新
                            </Button>
                          </Box>
                        </Grid>
                      )}
                    </Box>
                  </Box>
                </CardComponent>
              </Grid>
            </Box>
            <Box mb={3}>
              <Grid xs={12} sm={20} md={20}>
                <CardContent
                  style={{
                    width: "80%",
                    height: "50%",
                    borderRadius: "7px",
                    borderStyle: "solid",
                    borderWidth: "2px",
                    margin: "auto",
                  }}
                >
                  <Box textAlign="center">
                    <Typography sx={{ fontSize: 20, mx: "auto" }}>
                      {`メールアドレス: ${userName && userName.email}`}
                    </Typography>
                  </Box>
                </CardContent>
              </Grid>
            </Box>
          </Box>
          <Box textAlign="center" mb={3}>
            <Grid xs={12} sm={20} md={20}>
              <CardContent
                style={{
                  width: "80%",
                  height: "50%",
                  borderRadius: "7px",
                  borderStyle: "solid",
                  borderWidth: "2px",
                  margin: "auto",
                }}
              >
                <Grid item xs={12} sm={14} lg={20} md={20}>
                  <CardMedia
                    component="img"
                    sx={{
                      borderRadius: "10%",
                      width: "90%",
                      margin: "auto",
                    }}
                    image={userName && userName.photoURL}
                    alt="Icon"
                  />
                </Grid>
                <Box component="form" noValidate onSubmit={onSubmit} m="center">
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
                    {sending === false ? (
                      <Button
                        onClick={() => router.reload()}
                        sx={{ mb: 2, ml: 1 }}
                      >
                        リロードして確認
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        sx={{ mb: 1, ml: 1 }}
                        onClick={() => setIsLoading(true)}
                      >
                        {isLoading == true
                          ? "ダウンロード中..."
                          : "ダウンロード"}
                      </Button>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Grid>
          </Box>
          {err == true && (
            <AlertComponent>読み取りに失敗しました</AlertComponent>
          )}
        </React.Fragment>
        <ToastContainer />
      </MediaContextProvider>
    </>
  );
}
