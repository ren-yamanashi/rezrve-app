import DateRangeIcon from "@mui/icons-material/DateRange";
import GroupsIcon from "@mui/icons-material/Groups";
import * as React from "react";
import Box from "@mui/material/Box";
import { createMedia } from "@artsy/fresnel";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import SnackComponent3 from "../../atoms/Snack/SnackTitle3";
import TabComponent from "../../atoms/TabList/TabComponent";
import TabListComponent from "../../atoms/TabList/TabListComponent";
import TabPanelComponent from "../../atoms/TabList/TabPanelComponent";
// import my File
import YoyakuTeacher from "./YoyakuTeacher";
import YoyakuDate from "./YoyakuDate";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 1024,
    xl: 1200,
  },
});

//予約方法選択
const RsvPage = () => {
  return (
    <>
      <React.Fragment>
        <SnackComponent3 />
        <MediaContextProvider>
          <Media greaterThan="md">
            <TabsUnstyled defaultValue={2}>
              <TabListComponent>
                <TabComponent
                  sx={{
                    borderStyle: "solid",
                    fontSize: 20,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box display="flex" mx="auto">
                    <Box alignItems="center" my="auto" mr={3}>
                      <GroupsIcon fontSize="large" />
                    </Box>
                    <Box>
                      <Box display="flex" textAlign="center" mx="auto">
                        担当者から探す
                      </Box>
                      <Box
                        sx={{ fontSize: "10%" }}
                        display="flex"
                        textAlign="center"
                        mx="auto"
                        mt={1}
                      >
                        担当者を指定して予約をする
                      </Box>
                    </Box>
                  </Box>
                </TabComponent>
                <TabComponent
                  sx={{
                    borderStyle: "solid",
                    fontSize: 20,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box display="flex" mx="auto">
                    <Box alignItems="center" my="auto" mr={3}>
                      <DateRangeIcon fontSize="large" />
                    </Box>
                    <Box>
                      <Box display="flex" textAlign="center" mx="auto">
                        日程から探す
                      </Box>
                      <Box
                        sx={{ fontSize: 10 }}
                        display="flex"
                        textAlign="center"
                        mx="auto"
                        mt={1}
                      >
                        希望の日程から予約をする
                      </Box>
                    </Box>
                  </Box>
                </TabComponent>
              </TabListComponent>
              <TabPanelComponent value={0}>
                <Box mt={5}>
                  <YoyakuTeacher />
                </Box>
              </TabPanelComponent>
              <TabPanelComponent value={1}>
                <Box mt={5}>
                  <YoyakuDate />
                </Box>
              </TabPanelComponent>
              <TabPanelComponent value={2}></TabPanelComponent>
            </TabsUnstyled>
          </Media>
          <Media at="md">
            <TabsUnstyled defaultValue={2}>
              <TabListComponent>
                <TabComponent
                  sx={{
                    borderStyle: "solid",
                    fontSize: 10,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box display="flex" mx="auto">
                    <Box alignItems="center" my="auto" mr={3}>
                      <GroupsIcon fontSize="large" />
                    </Box>
                    <Box
                      display="flex"
                      textAlign="center"
                      mx="auto"
                      my="auto"
                      fontSize={12}
                    >
                      担当者から探す
                    </Box>
                  </Box>
                </TabComponent>
                <TabComponent
                  sx={{
                    borderStyle: "solid",
                    fontSize: 10,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box display="flex" mx="auto">
                    <Box alignItems="center" my="auto" mr={3}>
                      <DateRangeIcon fontSize="large" />
                    </Box>
                    <Box
                      display="flex"
                      textAlign="center"
                      mx="auto"
                      my="auto"
                      fontSize={12}
                    >
                      日程から探す
                    </Box>
                  </Box>
                </TabComponent>
              </TabListComponent>
              <TabPanelComponent value={0}>
                <Box mt={5}>
                  <YoyakuTeacher />
                </Box>
              </TabPanelComponent>
              <TabPanelComponent value={1}>
                <Box mt={5}>
                  <YoyakuDate />
                </Box>
              </TabPanelComponent>
              <TabPanelComponent value={2}></TabPanelComponent>
            </TabsUnstyled>
          </Media>
        </MediaContextProvider>
      </React.Fragment>
    </>
  );
};
export default RsvPage;
