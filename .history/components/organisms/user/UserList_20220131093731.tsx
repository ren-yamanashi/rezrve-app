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
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { Users } from "../../../models/Users";
import Title from "../../atoms/Title";
import { Button } from "@mui/material";
import { blue, red, teal } from "@mui/material/colors";

export default function UsersList() {
  const [users, setUsers] = useState<Users[]>([]);
  const { user } = useAuth();
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
      const q = query(collection(db, "users"));
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
              <Grid item xs={12} sm={4} lg={4} md={4}>
                <Box mb={3} display="flex" mx={2}>
                  <CardContent
                    style={{
                      width: "100%",
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
                          height: 240,
                        }}
                        image={index.url}
                        alt="Icon"
                      />
                    </Grid>
                    {user.email.indexOf("@bee") && (
                      <Link_mui href={`/user/edit/${user?.uid}`}>
                        <ListItem button key="editUser">
                          <ListItemIcon>
                            <PersonAddAltIcon
                              sx={{ color: blue[500], m: "auto" }}
                            />
                          </ListItemIcon>
                          <ListItemText primary="シフト登録" />
                        </ListItem>
                      </Link_mui>
                    )}
                    <Box display="flex" margin="auto">
                      <Typography sx={{ fontSize: 15, my: 3, mx: "auto" }}>
                        {`講師名 : ${index.userName}`}
                      </Typography>
                      {user.displayName.indexOf("管理者") !== -1 && (
                        <IconButton onClick={(e) => deleteUser(index.id, e)}>
                          <DeleteIcon sx={{ fontSize: 30, color: teal[500] }} />
                        </IconButton>
                      )}
                    </Box>
                    <Box display="flex" margin="auto">
                      <Typography sx={{ fontSize: 15, mx: "auto" }}>
                        {`メールアドレス : ${index.email}`}
                      </Typography>
                    </Box>
                  </CardContent>
                </Box>
              </Grid>
            </>
          ))}
        </Box>
      </React.Fragment>
    </>
  );
}
