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

        {users.map((user) => (
          <>
            <Grid item xs={8} sm={8} lg={4} md={4}>
              <Box mb={3} display="flex" ml={3}>
                <CardContent
                  style={{
                    width: "100%",
                    borderRadius: "7px",
                    borderStyle: "solid",
                    borderWidth: "2px",
                    margin: "auto",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      borderRadius: "10%",
                      height: 140,
                    }}
                    image={user.url}
                    alt="Icon"
                  />
                  <Typography sx={{ fontSize: 15, my: 3, mx: "auto" }}>
                    {`講師名 : ${user.userName}`}
                  </Typography>
                  <Typography sx={{ fontSize: 15, mx: "auto" }}>
                    {`メールアドレス : ${user.email}`}
                  </Typography>
                </CardContent>
              </Box>
            </Grid>
          </>
        ))}
      </React.Fragment>
    </>
  );
}
