import * as React from "react";
import { Box } from "@mui/material";
import { createMedia } from "@artsy/fresnel";
import Title from "../../../../components/atoms/Text/PrimaryTitle";
import ShiftsAll from "../../../organisms/manager/ShiftAll";
import Header from "../../../templates/Header/HeaderNext";
import HeaderAtMd from "../../../../components/templates/Header/Header";
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

const ShiftList_Manager = (props) => {
  return (
    <>
      <MediaContextProvider>
        <Media greaterThan="md">
          <Header>
            <Box mt={10}>
              <ShiftsAll shifts={props.shifts} />
            </Box>
          </Header>
        </Media>
        <Media at="md">
          <HeaderAtMd />
          <Box mt={3}>
            <ShiftsAll shifts={props.shifts} />
          </Box>
        </Media>
        <Media at="sm">
          <Box mt={5} ml={2} mr={2} display="flex">
            <Title>管理者ページは、 スマートフォンでの閲覧はできません</Title>
          </Box>
        </Media>
      </MediaContextProvider>
    </>
  );
};

export default ShiftList_Manager;
