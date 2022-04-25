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
    </>
  );
};

export default Tab2;
