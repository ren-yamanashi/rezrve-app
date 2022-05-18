import Shifts from "../../../organisms/staff/Shift";
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

const ShiftList_Staff = (props) => {
  return (
    <>
      <MediaContextProvider>
        <Media greaterThan="md">
          <Header>
            <Box mt={10}>
              <Shifts
                shifts={props.shifts}
                times={props.times}
                user={props.user}
              />
            </Box>
          </Header>
        </Media>
        <Media at="md">
          <HeaderAtMd />
          <Shifts shifts={props.shifts} times={props.times} user={props.user} />
        </Media>
        <Media at="sm">
          <HeaderAtMd />
          <Shifts shifts={props.shifts} times={props.times} user={props.user} />
        </Media>
      </MediaContextProvider>
    </>
  );
};

export default ShiftList_Staff;
