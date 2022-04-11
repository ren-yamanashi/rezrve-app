import dayjs from "dayjs";
//import my File
import Reserve from "../../../organisms/teacher/Reserves";
import Header from "../../../templates/Header/HeaderNext";
import HeaderAtMd from "../../../templates/Header/Header";
import { Box } from "@mui/material";
import SelectDay from "../../../organisms/teacher/selectday";
import Calender1 from "../../../organisms/teacher/Calender";
import FreeSpace from "../../../organisms/teacher/FreeSpace";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import { createMedia } from "@artsy/fresnel";
import Tab from "../../../atoms/TabList/TabComponent";
import TabPanel from "../../../atoms/TabList/TabPanelComponent";
import TabsList from "../../../atoms/TabList/TabListComponent";
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
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
                <Media greaterThan="lg">
                  <TabsList sx={{ width: "100%" }}>
                    <Tab>{`${dayjs(new Date()).format("M/D")} の予約`}</Tab>
                    <Tab>1週間の予約</Tab>
                    <Tab>予約カレンダー</Tab>
                    <Tab>予約登録</Tab>
                  </TabsList>
                </Media>
                <Media at="lg">
                  <TabsList sx={{ width: "100%" }}>
                    <Tab>
                      <Box sx={{ fontSize: "10px" }}>{`${dayjs(
                        new Date()
                      ).format("M/D ")} の予約`}</Box>
                    </Tab>
                    <Tab>
                      <Box sx={{ fontSize: "10px" }}>1週間の予約</Box>
                    </Tab>
                    <Tab>
                      <Box sx={{ fontSize: "10px" }}>予約カレンダー </Box>
                    </Tab>
                    <Tab>
                      <Box sx={{ fontSize: "10px" }}>予約登録 </Box>
                    </Tab>
                  </TabsList>
                </Media>
                <TabPanel value={0}>
                  <SelectDay />
                </TabPanel>
                <TabPanel value={1}>
                  <Reserve />
                </TabPanel>
                <TabPanel value={2}>
                  <Calender1 />
                </TabPanel>
                <TabPanel value={3}>
                  <FreeSpace />
                </TabPanel>
              </TabsUnstyled>
            </Box>
          </Header>
        </Media>
        <Media at="md">
          <HeaderAtMd />
          <Box mt={1}>
            <TabsUnstyled defaultValue={0}>
              <TabsList sx={{ width: "100%" }}>
                <Tab>
                  <Box sx={{ fontSize: "10px" }}>{`${dayjs(new Date()).format(
                    "M/D "
                  )} の予約`}</Box>
                </Tab>
                <Tab>
                  <Box sx={{ fontSize: "10px" }}>1週間の予約</Box>{" "}
                </Tab>
                <Tab>
                  <Box sx={{ fontSize: "10px" }}>予約カレンダー </Box>
                </Tab>
                <Tab>
                  <Box sx={{ fontSize: "10px" }}>予約登録 </Box>
                </Tab>
              </TabsList>
              <TabPanel value={0}>
                <SelectDay />
              </TabPanel>
              <TabPanel value={1}>
                <Reserve />
              </TabPanel>
              <TabPanel value={2}>
                <Calender1 />
              </TabPanel>
              <TabPanel value={3}>
                <FreeSpace />
              </TabPanel>
            </TabsUnstyled>
          </Box>
        </Media>
        <Media at="sm">
          <HeaderAtMd />
          <Box>
            <TabsUnstyled defaultValue={0}>
              <TabsList>
                <Tab>
                  <Box sx={{ fontSize: "10px" }}>予約登録</Box>
                </Tab>
                <Tab>
                  <Box sx={{ fontSize: "10px" }}>1週間の予約</Box>
                </Tab>
                <Tab>
                  <Box sx={{ fontSize: "10px", width: "100%" }}>
                    1ヶ月の予約
                  </Box>
                </Tab>
              </TabsList>
              <TabPanel value={0}>
                <FreeSpace />
              </TabPanel>
              <TabPanel value={1}>
                <Reserve />
              </TabPanel>
              <TabPanel value={2}>
                <Calender1 />
              </TabPanel>
            </TabsUnstyled>
          </Box>
        </Media>
      </MediaContextProvider>
    </>
  );
}
