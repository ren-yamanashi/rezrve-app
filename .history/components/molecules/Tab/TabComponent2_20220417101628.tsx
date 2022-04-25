import GroupsIcon from "@mui/icons-material/Groups";
import DateRangeIcon from "@mui/icons-material/DateRange";
import TabComponent from "../../atoms/TabList/TabComponent";
import Box from "@mui/material/Box";
import React from "react";

const Tab2 = (props) => {
  return (
    <>
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
            講師から探す
          </Box>
        </Box>
      </TabComponent>
    </>
  );
};

export default Tab2;
