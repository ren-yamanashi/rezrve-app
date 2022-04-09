import dayjs from "dayjs";
import { Box } from "@mui/material";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import { createMedia } from "@artsy/fresnel";
import Header from "../../../components/templates/HeaderNext";
import HeaderAtMd from "../../../components/templates/Header";
import ReservesAll from "../../../components/organisms/ReservesAll";
import SelectDay from "../../../components/organisms/calender/SelectDayAll";
import Calender from "../../../components/organisms/calender/CalenderAll";
import RsvPage from "../../../components/organisms/manager/RsvPage";
import Title from "../../../components/atoms/Text/PrimaryTitle";
import Tab from "../../../components/atoms/TabList/TabComponent";
import TabPanel from "../../../components/atoms/TabList/TabPanelComponent";
import TabsList from "../../../components/atoms/TabList/TabListComponent";
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

export default function ReservePage() {
  return (
    <>
      <MediaContextProvider>
        <Media greaterThan="md">
          <Header>
            <Box mt={10}>
              <TabsUnstyled defaultValue={0}>
                <TabsList sx={{ mx: "auto" }}>
                  <Tab>{`${dayjs(new Date()).format("M/D ")} の予約`}</Tab>
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
