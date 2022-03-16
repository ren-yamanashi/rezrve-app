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
import { teal } from "@mui/material/colors";
import { useRouter } from "next/router";
import { createMedia } from "@artsy/fresnel";
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { Users } from "../../../models/Users";
import Title from "../../atoms/Title";
import YoyakuTeacher from "./YoyakuTeacher";

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#4595e6",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[300]};
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid ${blue[200]};
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${blue[50]};
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: ${blue[400]};
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 1000,
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
        <TabsUnstyled defaultValue={2}>
          <TabsList>
            <Tab>インストラクターから探す</Tab>
            <Tab>日程から探す</Tab>
          </TabsList>
          <TabPanel value={0}>
            <YoyakuTeacher />
          </TabPanel>
          <TabPanel value={1}></TabPanel>
          <TabPanel value={2}></TabPanel>
        </TabsUnstyled>
        <Title>予約登録</Title>
        <Box
          width="100%"
          bgcolor="#0288d1"
          textAlign="center"
          mt={3}
          alignItems="center"
        >
          <Box mt={4}>
            <Typography color="white" fontWeight="bold" fontSize={20}>
              条件を指定して予約
            </Typography>
          </Box>
        </Box>
        <Box display="flex" my={5}>
          <Box margin="auto">
            <CardContent
              style={{
                borderRadius: "7px",
                borderStyle: "solid",
                borderWidth: "0.5px",
              }}
            >
              <Box mt={3} textAlign="center">
                <Button
                  onClick={() =>
                    router.push(`/shift/students/teacher/${user.uid}`)
                  }
                >
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
          </Box>
          <Box margin="auto">
            <CardContent
              style={{
                borderRadius: "7px",
                borderStyle: "solid",
                borderWidth: "0.5px",
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
        </Box>
      </React.Fragment>
    </>
  );
}