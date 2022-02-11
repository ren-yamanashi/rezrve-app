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
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import { browser } from "process";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Link_mui from "@mui/material/Link";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { blue, teal } from "@mui/material/colors";
import { useRouter } from "next/router";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { Users } from "../../../models/Users";
import Title from "../../atoms/Title";

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
      const q = query(
        collection(db, "users"),
        orderBy("email"),
        startAt("bee"),
        endAt("bee" + "\uf8ff")
      );
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
        <Grid item xs={20} md={40}>
          <CardContent
            style={{
              width: "95%",
              borderRadius: "7px",
              borderStyle: "solid",
              borderWidth: "2px",
              borderColor: "#4689FF",
              margin: "auto",
            }}
          >
            <Title ml={3}>予約登録</Title>
            <Box textAlign="center" margin="auto" alignItems="center">
              <>
                {/* <Grid item xs={12} sm={4} lg={4} md={4}> */}
                <Box
                  mb={5}
                  mx={2}
                  mt={10}
                  textAlign="center"
                  alignItems="center"
                >
                  <CardContent
                    style={{
                      width: "30%",
                      borderRadius: "7px",
                      borderStyle: "solid",
                      borderWidth: "2px",
                      margin: "auto",
                    }}
                  >
                    <Box mt={3} textAlign="center">
                      <Button onClick={() => router.push(`/user/${user.uid}`)}>
                        <PersonIcon
                          sx={{ color: blue[500], mr: 3 }}
                          fontSize="large"
                        />
                        <Typography
                          variant="h6"
                          noWrap
                          sx={{
                            fontFamily: "cursive",
                            fontSize: 35,
                          }}
                          component="div"
                        >
                          講師で選択
                        </Typography>
                      </Button>
                    </Box>
                  </CardContent>
                </Box>
                {/* </Grid> */}
              </>
              <>
                {/* <Grid item xs={12} sm={4} lg={4} md={4}> */}
                <Box mb={3} display="flex" mx={2}>
                  <CardContent
                    style={{
                      width: "30%",
                      borderRadius: "7px",
                      borderStyle: "solid",
                      borderWidth: "2px",
                      margin: "auto",
                    }}
                  >
                    <Box mt={3} textAlign="center">
                      <Button
                        onClick={() =>
                          router.push(`/shift/students/${user.uid}`)
                        }
                      >
                        <DateRangeIcon
                          sx={{ color: blue[500], mr: 3 }}
                          fontSize="large"
                        />
                        <Typography
                          variant="h6"
                          noWrap
                          sx={{
                            fontFamily: "cursive",
                            fontSize: 35,
                          }}
                          component="div"
                        >
                          日付で選択
                        </Typography>
                      </Button>
                    </Box>
                  </CardContent>
                </Box>
                {/* </Grid> */}
              </>
            </Box>
          </CardContent>
        </Grid>

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
