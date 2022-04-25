import Shifts from "../../../organisms/teacher/Shift";
import Header from "../../Header/Header_Staff";
import HeaderAtMd from "../../Header/Header";
import { Box } from "@mui/material";
import { createMedia } from "@artsy/fresnel";
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

const ShiftList_Staff = () => {
  return (
    <>
      <MediaContextProvider>
        <Media greaterThan="md">
          <Header>
            <Box mt={10}>
              <Shifts />
            </Box>
          </Header>
        </Media>
        <Media at="md">
          <HeaderAtMd />
          <Shifts />
        </Media>
        <Media at="sm">
          <HeaderAtMd />
          <Shifts />
        </Media>
      </MediaContextProvider>
    </>
  );
};

export default ShiftList_Staff;
