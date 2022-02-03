import React, { useEffect, useState } from "react";
import { useFileUpload } from "use-file-upload";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { child } from "firebase/database";
import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
  getDocs,
  startAt,
  endAt,
  Timestamp,
  deleteDoc,
  doc,
  getDoc,
  runTransaction,
} from "firebase/firestore";
import { browser } from "process";
import Link_mui from "@mui/material/Link";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Input } from "@mui/material";
import { Button } from "@mui/material";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { Users } from "../../../models/Users";
import Title from "../../atoms/Title";
import { getAuth, updateProfile } from "firebase/auth";

//queryの方を準備
type Query = {
  id: string;
};

export default function UploadFile() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [u, setU] = useState<Users[]>([]);
  const [url, setUrl] = useState("");
  const [test, setTest] = useState<string>("");
  const [test2, setTest2] = useState<string>("");
  const [test3, setTest3] = useState<string>("");
  const storage = getStorage();
  const { user } = useAuth();
  const db = getFirestore();
  //コレクション設定
  function getCollections() {
    const db = getFirestore();
    return {
      db,
      userCollection: collection(db, "users"),
    };
  }
  //ユーザーを取り出す
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    /**========
     * Firebaseからユーザーを取得
     *========*/
    async function loadUser() {
      const x = user;
      setTest(x.displayName);
      setTest2(x.email);
      setTest3(x.photoURL);

      const q = query(collection(db, "users"), where("id", "==", user.uid));

      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return;
      }
      //ReserveList一覧の展開
      const gotUsers = snapshot.docs.map((doc) => {
        const user = doc.data() as Users;
        user.id = doc.id;
        return user;
      });
      setU(gotUsers);
    }
    loadUser();
  }, [process, browser, user]);
  //   /**
  //    * @param e 画像を更新
  //    */
  //   async function onSubmit2(e: any) {
  //     e.preventDefault();
  //     const { db, userCollection } = getCollections();
  //     const userRef = doc(userCollection);
  //     await runTransaction(db, async (t: any) => {
  //       t.update(doc(userCollection, user.uid), {
  //         url: url,
  //       });
  //     });
  //   }

  /**=============
   * @param event 画像をFirebaseにアップロード
   *=============*/
  const onSubmit = async (event) => {
    event.preventDefault();
    if (image === "") {
      console.log("ファイルが選択されていません");
    }
    // アップロード処理
    const storageRef = ref(storage, "/images/" + file.name);
    const uploadTask = uploadBytes(storageRef, file);
    const { db, userCollection } = getCollections();
    const auth = getAuth();
    const userRef = doc(userCollection);
    uploadTask.then((snapshot: any) => {
      //urlを取得
      getDownloadURL(storageRef).then((url) => {
        setUrl(url);
        console.log(url);
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
      console.log(snapshot);
      console.log(user.photoURL);
    });
  };
  //   const downLoad = () => {
  //     const storageRef = ref(storage, "/images/" + file.name);
  //     getDownloadURL(storageRef).then((url) => {
  //       setUrl(url);
  //       console.log(url);
  //       setFile("");
  //     });
  //   };
  /**===========
   * @param event 画像をstateに保存する処理
   *===========*/
  function handleChange(event) {
    setFile(event.target.files[0]);
    setImage(file);
  }
  /**==========
   * @param event 画像のurlを取得
   *==========*/

  return (
    <>
      <React.Fragment>
        <Box ml={3}>
          <Title>プロフィール</Title>
        </Box>
        <Box textAlign="center">
          <Typography sx={{ fontSize: 20, my: 3, mx: "auto" }}>
            {`氏名: ${test}`}
          </Typography>
          <Typography sx={{ fontSize: 20, my: 3, mx: "auto" }}>
            {`メールアドレス: ${test2}`}
          </Typography>
        </Box>
        <Box textAlign="center">
          <CardContent
            style={{
              width: "50%",
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
                }}
                image={test3}
                alt="Icon"
              />
            </Grid>
            <Box component="form" noValidate onSubmit={onSubmit} m="center">
              <Button variant="contained" sx={{ mt: 3, mb: 2, ml: 5 }}>
                {`画像を選択 ${file?.name}`}
                <Input
                  sx={{ opacity: 0, appearance: "none", position: "absolute" }}
                  type="file"
                  onChange={handleChange}
                />
              </Button>
              <Button type="submit">ダウンロード</Button>
            </Box>
          </CardContent>
        </Box>
      </React.Fragment>
    </>
  );
}
