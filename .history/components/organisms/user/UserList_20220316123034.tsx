import {
  collection,
  getFirestore,
  query,
  getDocs,
  deleteDoc,
  doc,
  where,
  orderBy,
  startAt,
  endAt,
} from "firebase/firestore";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { browser } from "process";
import Link_mui from "@mui/material/Link";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { blue, grey, teal } from "@mui/material/colors";
import { useRouter } from "next/router";
import { createMedia } from "@artsy/fresnel";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { Users } from "../../../models/Users";
import Title from "../../atoms/Title";

//MediaQuery設定
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 700,
    lg: 860,
    xl: 1200,
  },
});
//Modalのスタイル（予約登録確認画面）
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 370,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
//Itemのスタイル
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  backgroundColor: "#FFFFDD",
}));
const Item2 = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

//ユーザーリストの作成　名前に管理者があればユーザーの削除が可能。 メアドに @bee が入っていればシフトの登録が可能
export default function UsersList() {
  const db = getFirestore();
  const [users, setUsers] = useState<Users[]>([]);
  const { user } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();

  /**========
   * Firebaseからユーザーを取得
   *========*/
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    async function loadUser() {
      const q = query(collection(db, "users"), where("role", "==", "teacher"));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return;
      }
      //users一覧の展開
      const gotUsers = snapshot.docs.map((doc) => {
        const user = doc.data() as Users;
        user.id = doc.id;
        return user;
      });
      setUsers(gotUsers);
    }
    loadUser();
  }, [process, browser, user]);
  /**==============
   * ユーザー削除
   *=============*/
  const deleteUser = async (id: string, e: any) => {
    const q = query(collection(db, "users"), where("role", "==", "teacher"));
    e.stopPropagation();
    await deleteDoc(doc(db, "users", id));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return;
    }
    const gotUsers = snapshot.docs.map((doc) => {
      const user = doc.data() as Users;
      user.id = doc.id;
      return user;
    });
    setUsers(gotUsers);
  };
  return (
    <>
      <React.Fragment>
        <Box ml={3}>
          <Title>講師一覧</Title>
        </Box>
        <Box display="flex" flexWrap="wrap">
          {users.map((index) => (
            <>
              <Box mb={3} display="flex" justifyContent="center" mx="auto">
                <Grid item xs={6} sm={4} lg={4} md={5}>
                  <Box mb={3} display="flex" justifyContent="center" mx="auto">
                    <CardContent
                      style={{
                        borderRadius: "7px",
                        borderStyle: "solid",
                        borderWidth: "2px",
                        margin: "auto",
                        height: 250,
                      }}
                    >
                      <Grid item xs={6} sm={8} lg={3} md={8}>
                        <Box
                          sx={{
                            justifyContent: "center",
                            textAlign: "center",
                            alignItems: "center",
                          }}
                        >
                          <CardMedia
                            component="img"
                            sx={{
                              width: 200,
                              height: 120,
                              borderRadius: "10%",
                              justifyContent: "center",
                              textAlign: "center",
                              alignItems: "center",
                            }}
                            image={index.url}
                            alt="Icon"
                          />
                        </Box>
                      </Grid>
                      <IconButton>
                        <ListItem button key="editUser">
                          <ListItemIcon>
                            <PersonAddAltIcon
                              sx={{ color: blue[500], m: "auto" }}
                            />
                          </ListItemIcon>
                          <ListItemText primary="シフト登録" />
                        </ListItem>
                      </IconButton>
                      <Box display="flex" margin="auto">
                        <Typography sx={{ fontSize: 15, mx: "auto", mt: 1.5 }}>
                          {`講師名 : ${index.userName}`}
                        </Typography>
                        <IconButton onClick={(e) => deleteUser(index.id, e)}>
                          <DeleteIcon
                            sx={{
                              fontSize: 30,
                              color: teal[500],
                              alignItems: "center",
                              my: "auto",
                            }}
                          />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Box>
                </Grid>
              </Box>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Stack spacing={2} sx={{ width: "100%", my: 3, mx: "auto" }}>
                    <SnackbarContent
                      sx={{
                        bgcolor: blue[400],
                        justifyContent: "center",
                        boxShadow: "none",
                        fontWeight: 600,
                      }}
                      message={"シフト登録確認"}
                    />
                  </Stack>
                  <Box display="flex">
                    <Typography
                      variant="h5"
                      component="div"
                      color="black"
                      textAlign="center"
                      mx="auto"
                      fontSize={17}
                      fontWeight={400}
                      mb={3}
                    >
                      以下の内容でシフトを登録します
                    </Typography>
                  </Box>
                  <Item sx={{ my: 2 }}>
                    <Box display="flex">
                      <Typography
                        variant="h5"
                        component="div"
                        color="black"
                        textAlign="center"
                        mx="auto"
                        fontSize={19}
                        width={90}
                        fontWeight={500}
                      >
                        登録情報
                      </Typography>
                    </Box>
                  </Item>
                  <Item2 sx={{ my: 2 }}>
                    <Box display="flex">
                      <Typography
                        variant="h5"
                        component="div"
                        ml={1}
                        color="black"
                        textAlign="left"
                        fontSize={17}
                        width={90}
                        fontWeight={400}
                      >
                        登録日時
                      </Typography>
                      <Typography
                        variant="h5"
                        component="div"
                        ml={5}
                        color={grey[600]}
                        textAlign="left"
                        fontSize={17}
                      >
                        {`${xxx.getMonth() + 1}/${xxx.getDate()} ${time}:00 ~ ${
                          time + 1
                        }:00`}
                      </Typography>
                    </Box>
                  </Item2>
                  <Item sx={{ my: 2 }}>
                    <Box display="flex">
                      <Typography
                        variant="h5"
                        component="div"
                        ml={1}
                        color="black"
                        textAlign="left"
                        fontSize={17}
                        width={90}
                        fontWeight={400}
                      >
                        担当者
                      </Typography>
                      <Typography
                        variant="h5"
                        component="div"
                        ml={5}
                        color={grey[600]}
                        textAlign="left"
                        fontSize={17}
                      >
                        {index.userName}
                      </Typography>
                    </Box>
                  </Item>
                  <Item sx={{ my: 2 }}>
                    <Box display="flex">
                      <Typography
                        variant="h5"
                        component="div"
                        ml={1}
                        color="black"
                        textAlign="left"
                        fontSize={17}
                        width={90}
                        fontWeight={400}
                      >
                        登録状態
                      </Typography>
                      <Typography
                        variant="h5"
                        component="div"
                        ml={5}
                        color={grey[600]}
                        textAlign="left"
                        fontSize={17}
                      >
                        確定
                      </Typography>
                    </Box>
                  </Item>
                  <Box display="flex" justifyContent="right">
                    <Button
                      variant="contained"
                      sx={{
                        mt: 1,
                        mb: 2,
                        mr: 1,
                        bgcolor: teal[400],
                        color: "white",
                        "&:hover": { bgcolor: teal[500] },
                      }}
                      onClick={(e) => getRsv(e)}
                    >
                      シフト登録
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        mt: 1,
                        mb: 2,
                        mr: 1,
                        bgcolor: grey[500],
                        color: "white",
                        "&:hover": { bgcolor: grey[600] },
                      }}
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      キャンセル
                    </Button>
                  </Box>
                </Box>
              </Modal>
            </>
          ))}
        </Box>
      </React.Fragment>
    </>
  );
}
