import React, { useState } from "react";
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
import { CardActionArea } from "@mui/material";
import { Button } from "@mui/material";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { Users } from "../../../models/Users";
import Title from "../../atoms/Title";

export default function UploadFile() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [url, setUrl] = useState("");
  const storage = getStorage();
  /**=============
   * @param event 画像をFirebaseにアップロード
   *=============*/
  const onSubmit = (event) => {
    event.preventDefault();
    if (image === "") {
      console.log("ファイルが選択されていません");
    }
    // アップロード処理
    const storageRef = ref(storage, "/images/" + file.name);
    const uploadTask = uploadBytes(storageRef, file);
    uploadTask.then((snapshot: any) => {
      console.log(snapshot);
    });
    getDownloadURL(storageRef).then((url) => {
      setUrl(url);
      console.log(url);
    });
  };
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
        <Box>
          <Typography sx={{ fontSize: 15, my: 3, mx: "auto" }}>
            プロフィール画像
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
            <input type="file" onChange={handleChange} />
            <Button>Upload</Button>
          </Box>
        </Box>
      </React.Fragment>
    </>
  );
}
