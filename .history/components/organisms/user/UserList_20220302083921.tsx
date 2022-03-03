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
import { blue, teal } from "@mui/material/colors";
import { useRouter } from "next/router";
import { createMedia } from "@artsy/fresnel";
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

//ユーザーリストの作成　名前に管理者があればユーザーの削除が可能。 メアドに @bee が入っていればシフトの登録が可能
export default function UsersList() {
  const [users, setUsers] = useState<Users[]>([]);
  const { user } = useAuth();
  const [err, setErr] = useState<boolean>(false);
  const [test, setTest] = useState<string>("");
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
      const db = getFirestore();
      const u = user;
      setTest(u.displayName);
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
    const db = getFirestore();
    const q = query(collection(db, "users"));
    e.stopPropagation();
    try {
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
    } catch (error) {
      console.log(error);
      setErr(true);
    }
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
                        height: 230,
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
                      <MediaContextProvider>
                        <Media greaterThan="md">
                          <Link_mui href={`/user/edit/list/${index.id}`}>
                            <ListItem button key="editUser">
                              <ListItemIcon>
                                <PersonAddAltIcon
                                  sx={{ color: blue[500], m: "auto" }}
                                />
                              </ListItemIcon>
                              <ListItemText primary="シフト登録" />
                            </ListItem>
                          </Link_mui>
                          <Box display="flex" margin="auto">
                            <Typography sx={{ fontSize: 15, mx: "auto" }}>
                              {`講師名 : ${index.userName}`}
                            </Typography>
                            <IconButton
                              onClick={(e) => deleteUser(index.id, e)}
                            >
                              <DeleteIcon
                                sx={{
                                  fontSize: 30,
                                  color: teal[500],
                                  alignItems: "center",
                                }}
                              />
                            </IconButton>
                          </Box>
                        </Media>
                        <Media at="md">
                          <Link_mui href={`/user/edit/list/${index.id}`}>
                            <ListItem button key="editUser">
                              <ListItemIcon>
                                <PersonAddAltIcon
                                  sx={{ color: blue[500], m: "auto" }}
                                />
                              </ListItemIcon>
                              <ListItemText primary="シフト登録" />
                            </ListItem>
                          </Link_mui>
                          <Box display="flex" margin="auto">
                            <Typography sx={{ fontSize: 15, mx: "auto" }}>
                              {`講師名 : ${index.userName}`}
                            </Typography>
                          </Box>
                        </Media>
                        <Media at="sm">
                          <Box display="flex" justifyContent="center">
                            <PersonAddAltIcon
                              sx={{ color: teal[500], mt: 2 }}
                            />
                            <Box
                              sx={{
                                color: teal[600],
                                mt: 2,
                                fontSize: "14px",
                                ml: 1,
                              }}
                            >
                              シフト登録
                            </Box>
                          </Box>
                          <Link_mui href={`/user/edit/list/${index.id}`}>
                            <ListItem button key="editUser">
                              <Box>
                                <ListItemText primary={index.userName} />
                              </Box>
                            </ListItem>
                          </Link_mui>
                        </Media>
                      </MediaContextProvider>
                    </CardContent>
                  </Box>
                </Grid>
              </Box>
            </>
          ))}
        </Box>
        {err == true && (
          <Box textAlign="center">
            <Grid xs={12} sm={15}>
              <Alert variant="filled" severity="error" sx={{ m: 3 }}>
                エラー : 1度ホームに戻り、再度アクセスしてください
                <Button
                  onClick={() => {
                    setErr(false), router.push(`/home/${user.uid}`);
                  }}
                  size="small"
                  sx={{ color: "red", bgcolor: "whitesmoke", m: 1 }}
                >
                  了解
                </Button>
              </Alert>
            </Grid>
          </Box>
        )}
      </React.Fragment>
    </>
  );
}
