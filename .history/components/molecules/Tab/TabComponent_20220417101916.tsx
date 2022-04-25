import GroupsIcon from "@mui/icons-material/Groups";
import DateRangeIcon from "@mui/icons-material/DateRange";
import TabComponent from "../../atoms/TabList/TabComponent";
import Box from "@mui/material/Box";
import { createMedia } from "@artsy/fresnel";
import React from "react";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 1024,
    xl: 1200,
  },
});

const Tab = (props) => {
  return (
    <>
      <MediaContextProvider>
        <Media greaterThan="md">
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
                {props.number == 1 ? (
                  <GroupsIcon fontSize="large" />
                ) : (
                  <DateRangeIcon fontSize="large" />
                )}
              </Box>
              <Box>
                <Box display="flex" textAlign="center" mx="auto">
                  {props.title}
                </Box>
                <Box
                  sx={{ fontSize: "10%" }}
                  display="flex"
                  textAlign="center"
                  mx="auto"
                  mt={1}
                >
                  {props.subTitle}
                </Box>
              </Box>
            </Box>
          </TabComponent>
        </Media>
        <Media at="md">
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
                {props.number == 1 ? (
                  <GroupsIcon fontSize="large" />
                ) : (
                  <DateRangeIcon fontSize="large" />
                )}
              </Box>
              <Box
                display="flex"
                textAlign="center"
                mx="auto"
                my="auto"
                fontSize={12}
              >
                {props.title}
              </Box>
            </Box>
          </TabComponent>
        </Media>
      </MediaContextProvider>
    </>
  );
};

export default Tab;
