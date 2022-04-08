import DateRangeIcon from "@mui/icons-material/DateRange";
import GroupsIcon from "@mui/icons-material/Groups";
import React from "react";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import Box from "@mui/material/Box";
import { teal } from "@mui/material/colors";
import { createMedia } from "@artsy/fresnel";
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
//内部インポート
import YoyakuTeacher from "./YoyakuTeacher";
import YoyakuSeito from "./YoyakuDay";
import SnackComponent3 from "../../atoms/Snack/SnackTitle3";

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
    lg: 990,
    xl: 1200,
  },
});

//ユーザーリストの作成　名前に管理者があればユーザーの削除が可能。 メアドに @bee が入っていればシフトの登録が可能
export default function UsersList() {
  return (
    <>
      <React.Fragment>
        <MediaContextProvider>
          <SnackComponent3 />
          <Media greaterThan="md">
            <TabsUnstyled defaultValue={2}>
              <TabsList>
                <Tab
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
                        講師から探す
                      </Box>
                      <Box
                        sx={{ fontSize: 10 }}
                        display="flex"
                        textAlign="center"
                        mx="auto"
                        mt={1}
                      >
                        講師を指定して予約をする
                      </Box>
                    </Box>
                  </Box>
                </Tab>
                <Tab
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
                </Tab>
              </TabsList>
              <TabPanel value={0}>
                <Box mt={5}>
                  <YoyakuTeacher />
                </Box>
              </TabPanel>
              <TabPanel value={1}>
                <Box mt={5}>
                  <YoyakuSeito />
                </Box>
              </TabPanel>
              <TabPanel value={2}></TabPanel>
            </TabsUnstyled>
          </Media>
          {/* レスポンシブ md */}
          <Media at="md">
            <TabsUnstyled defaultValue={2}>
              <TabsList>
                <Tab
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
                      講師から探す
                    </Box>
                  </Box>
                </Tab>
                <Tab
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
                </Tab>
              </TabsList>
              <TabPanel value={0}>
                <Box mt={5}>
                  <YoyakuTeacher />
                </Box>
              </TabPanel>
              <TabPanel value={1}>
                <Box mt={5}>
                  <YoyakuSeito />
                </Box>
              </TabPanel>
              <TabPanel value={2}></TabPanel>
            </TabsUnstyled>
          </Media>
          {/* スマホレスポンシブ */}
          <Media at="sm">
            <TabsUnstyled defaultValue={2}>
              <TabsList>
                <Tab
                  sx={{
                    borderStyle: "solid",
                    fontSize: 10,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box display="flex" mx="auto">
                    <Box alignItems="center" my="auto" mr={3}>
                      <GroupsIcon fontSize="small" />
                    </Box>
                    <Box
                      display="flex"
                      textAlign="center"
                      mx="auto"
                      my="auto"
                      fontSize={10}
                    >
                      講師から探す
                    </Box>
                  </Box>
                </Tab>
                <Tab
                  sx={{
                    borderStyle: "solid",
                    fontSize: 10,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box display="flex" mx="auto">
                    <Box alignItems="center" my="auto" mr={3}>
                      <DateRangeIcon fontSize="small" />
                    </Box>
                    <Box
                      display="flex"
                      textAlign="center"
                      mx="auto"
                      my="auto"
                      fontSize={10}
                    >
                      日程から探す
                    </Box>
                  </Box>
                </Tab>
              </TabsList>
              <TabPanel value={0}>
                <Box mt={5}>
                  <YoyakuTeacher />
                </Box>
              </TabPanel>
              <TabPanel value={1}>
                <Box mt={5}>
                  <YoyakuSeito />
                </Box>
              </TabPanel>
              <TabPanel value={2}></TabPanel>
            </TabsUnstyled>
          </Media>
        </MediaContextProvider>
      </React.Fragment>
    </>
  );
}
