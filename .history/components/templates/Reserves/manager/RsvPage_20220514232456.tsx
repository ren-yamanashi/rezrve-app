import { Box } from "@mui/material";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import { createMedia } from "@artsy/fresnel";
import Header from "../../../templates/Header/HeaderNext";
import HeaderAtMd from "../../../templates/Header/Header";
import ReservesAll from "../../../organisms/manager/ReservesAll";
import SelectDay from "../../../organisms/manager/ScheduleAll";
import Calender from "../../../organisms/manager/CalenderAll";
import RsvPage from "../../../organisms/manager/RsvPage";
import Title from "../../../atoms/Text/PrimaryTitle";
import Tab from "../../../atoms/TabList/TabComponent";
import TabPanel from "../../../atoms/TabList/TabPanelComponent";
import TabsList from "../../../atoms/TabList/TabListComponent";
import dayjs from "dayjs";
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

const ReservePage = (props) => {
  return (
    <>
      <MediaContextProvider>
        <Media greaterThan="md">
          <Header>
            <Box mt={10}>
              <TabsUnstyled defaultValue={0}>
                <TabsList sx={{ mx: "auto" }}>
                  <Tab>{`${dayjs(new Date()).format("M/D")} の予約`}</Tab>
                  <Tab>1週間の予約</Tab>
                  <Tab>予約カレンダー</Tab>
                  <Tab>予約登録</Tab>
                </TabsList>
                <TabPanel value={0}>
                  <SelectDay
                    reserve={props.reserve}
                    staffs={props.staffs}
                    times={props.times}
                  />
                </TabPanel>
                <TabPanel value={1}>
                  <ReservesAll />
                </TabPanel>
                <TabPanel value={2}>
                  <Box overflow="scroll">
                    <Calender />
                  </Box>
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
              <Tab>{`${dayjs(new Date()).format("M/D")} の予約`}</Tab>
              <Tab>1週間の予約</Tab>
              <Tab>予約カレンダー</Tab>
              <Tab>予約登録</Tab>
            </TabsList>
            <TabPanel value={0}>
              <SelectDay reserve={props.reserve} staffs={props.users} />
            </TabPanel>
            <TabPanel value={1}>
              <ReservesAll />
            </TabPanel>
            <TabPanel value={2}>
              <Box overflow="scroll">
                <Calender />
              </Box>
            </TabPanel>
            <TabPanel value={3}>
              <Box mt={5}>
                <RsvPage />
              </Box>
            </TabPanel>
          </TabsUnstyled>
        </Media>
        <Media at="sm">
          <Box mt={5} ml={2} mr={2} display="flex">
            <Title>管理者ページは、 このサイズでの閲覧ができません</Title>
          </Box>
        </Media>
        <Media at="xs">
          <Box mt={5} ml={2} mr={2} display="flex">
            <Title>管理者ページは、 このサイズでの閲覧ができません</Title>
          </Box>
        </Media>
      </MediaContextProvider>
    </>
  );
};

export default ReservePage;
