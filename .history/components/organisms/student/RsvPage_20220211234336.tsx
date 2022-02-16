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

  return (
    <>
      <React.Fragment>
        <Box alignItems="center" display="flex" mt={3} mb={5}>
          <>
            {/* <Grid item xs={12} sm={4} lg={4} md={4}> */}
            <CardContent
              style={{
                width: "90%",
                borderRadius: "7px",
                borderStyle: "solid",
                borderWidth: "0.5px",
                marginLeft: 2,
                marginRight: 2,
              }}
            >
              <Box mt={3} textAlign="center">
                <Button onClick={() => router.push(`/user/${user.uid}`)}>
                  <PersonIcon
                    sx={{ color: blue[500], mr: 1 }}
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
            <CardContent
              style={{
                width: "50%",
                borderRadius: "7px",
                borderStyle: "solid",
                borderWidth: "0.5px",
                marginLeft: 2,
                marginRight: 2,
              }}
            >
              <Box mt={3} textAlign="center">
                <Button onClick={() => router.push(`/user/${user.uid}`)}>
                  <PersonIcon
                    sx={{ color: blue[500], mr: 1 }}
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

            {/* </Grid> */}
          </>
          {/* <>
            
            <Box mb={5} mx={2} mt={10} textAlign="center" alignItems="center">
              <CardContent
                style={{
                  width: "100%",
                  borderRadius: "7px",
                  borderStyle: "solid",
                  borderWidth: "0.5px",
                  margin: "auto",
                }}
              >
                <Box mt={3} textAlign="center">
                  <Button
                    onClick={() => router.push(`/shift/students/${user.uid}`)}
                  >
                    <DateRangeIcon
                      sx={{ color: blue[500], mr: 1 }}
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
          </> */}
        </Box>
      </React.Fragment>
    </>
  );
}
