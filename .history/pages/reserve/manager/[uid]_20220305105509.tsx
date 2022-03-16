import {
  collection,
  doc,
  getDoc,
  getFirestore,
  Timestamp,
} from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, FormEvent } from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { teal } from "@mui/material/colors";
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { createMedia } from "@artsy/fresnel";

import { User } from "../../../models/User";
import Header from "../../../components/templates/HeaderNext";
import HeaderAtMd from "../../../components/templates/Header";
import { useAuth } from "../../../hooks/useUserAuth";
import ReservesAll from "../../../components/organisms/ReservesAll";
import SelectDay from "../../../components/organisms/calender/SelectDayAll";
import Calender from "../../../components/organisms/calender/CalenderAll";
import RsvPage from "../../../components/organisms/manager/RsvPage";
import Title from "../../../components/atoms/Title";
type Query = {
  uid: string;
};
//MediaQuery設定
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 990,
    xl: 1220,
  },
});

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

export default function ReservePage() {
  const [user2, setUser] = useState<User>();
  const router = useRouter();
  const { user } = useAuth();
  const query = router.query as Query;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (query.uid === undefined) {
      return;
    }
    //Firebase からユーザーを取り出す
    async function loadUser() {
      const db = getFirestore();
      const ref = doc(collection(db, "users"), query.uid);
      const UserDoc = await getDoc(ref);
      if (!UserDoc.exists()) {
        return;
      }
      const gotUser = UserDoc.data() as User;
      gotUser.uid = UserDoc.id;
      setUser(gotUser);
    }
    loadUser();
  }, [query.uid]);
  return (
    <>
      <MediaContextProvider>
        <Media greaterThan="lg">
          <Header>
            <Box mt={10}>
              <TabsUnstyled defaultValue={0}>
                <TabsList
                  sx={{ width: "90%", justifyContent: "center", mx: "auto" }}
                >
                  <Tab>{`${dayjs(new Date()).format(
                    "YYYY/MM/DD "
                  )} の予約`}</Tab>
                  <Tab>1週間の予約</Tab>
                  <Tab>予約カレンダー</Tab>
                  <Tab>予約登録</Tab>
                </TabsList>
                <TabPanel value={0}>
                  <SelectDay />
                </TabPanel>
                <TabPanel value={1}>
                  <ReservesAll />
                </TabPanel>
                <TabPanel value={2}>
                  <Calender />
                </TabPanel>
                <TabPanel value={3}>
                  <Box mt={5}>
                    <RsvPage />
                  </Box>
                </TabPanel>
              </TabsUnstyled>
            </Box>
          </Header>
        </Media>
        <Media at="lg">
          <Header>
            <Box mt={10}>
              <TabsUnstyled defaultValue={0}>
                <TabsList
                  sx={{
                    justifyContent: "center",
                    width: "80%",
                    mx: "auto",
                  }}
                >
                  <Tab sx={{ fontSize: 15 }}>{`${dayjs(new Date()).format(
                    "YYYY/MM/DD "
                  )} の予約`}</Tab>
                  <Tab sx={{ fontSize: 15 }}>1週間の予約</Tab>
                  <Tab sx={{ fontSize: 15 }}>予約カレンダー</Tab>
                  <Tab sx={{ fontSize: 15 }}>予約登録</Tab>
                </TabsList>
                <TabPanel value={0}>
                  <SelectDay />
                </TabPanel>
                <TabPanel value={1}>
                  <ReservesAll />
                </TabPanel>
                <TabPanel value={2}>
                  <Calender />
                </TabPanel>
                <TabPanel value={3}>
                  <Box mt={5}>
                    <RsvPage />
                  </Box>
                </TabPanel>
              </TabsUnstyled>
            </Box>
          </Header>
        </Media>
        <Media at="md">
          <HeaderAtMd />
          <TabsUnstyled defaultValue={0}>
            <TabsList>
              <Tab>{`${dayjs(new Date()).format("YYYY/MM/DD ")} の予約`}</Tab>
              <Tab>1週間の予約</Tab>
              <Tab>予約カレンダー</Tab>
              <Tab>予約登録</Tab>
            </TabsList>
            <TabPanel value={0}>
              <SelectDay />
            </TabPanel>
            <TabPanel value={1}>
              <ReservesAll />
            </TabPanel>
            <TabPanel value={2}>
              <Calender />
            </TabPanel>
            <TabPanel value={3}>
              <Box mt={5}>
                <RsvPage />
              </Box>
            </TabPanel>
          </TabsUnstyled>
        </Media>
        <Media at="sm">
          <HeaderAtMd />
          <TabsUnstyled defaultValue={0}>
            <TabsList>
              <Tab>1週間の予約</Tab>
              <Tab>予約カレンダー</Tab>
              <Tab>予約登録</Tab>
            </TabsList>
            <TabPanel value={0}>
              <ReservesAll />
            </TabPanel>
            <TabPanel value={1}>
              <Calender />
            </TabPanel>
            <TabPanel value={2}>
              <Box mt={5}>
                <RsvPage />
              </Box>
            </TabPanel>
          </TabsUnstyled>
        </Media>
        <Media at="xs">
          <Box mt={5} ml={2} mr={2} display="flex">
            <Title>管理者ページは、 スマートフォンでの閲覧はできません</Title>
          </Box>
        </Media>
      </MediaContextProvider>
    </>
  );
}
