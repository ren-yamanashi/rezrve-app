import DateRangeIcon from "@mui/icons-material/DateRange";
import GroupsIcon from "@mui/icons-material/Groups";
import React from "react";
import Box from "@mui/material/Box";
import { createMedia } from "@artsy/fresnel";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import SnackComponent3 from "../../atoms/Snack/SnackTitle3";
import TabComponent from "../../atoms/TabList/TabComponent";
import TabListComponent from "../../atoms/TabList/TabListComponent";
import TabPanelComponent from "../../atoms/TabList/TabPanelComponent";
import Tab from "../../molecules/Tab/TabComponent";
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

const UsersList = () => {
  return (
    <>
      <React.Fragment>
        <SnackComponent3 />
        <MediaContextProvider>
          <TabsUnstyled defaultValue={2}>
            <TabListComponent>
              <Tab
                number={1}
                title={"講師から探す"}
                subTitle={"講師を指定して予約する"}
              />
              <Tab
                number={2}
                title={"日程から探す"}
                subTitle={"希望の日程から予約する"}
              />
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
        </MediaContextProvider>
      </React.Fragment>
    </>
  );
};
export default UsersList;
