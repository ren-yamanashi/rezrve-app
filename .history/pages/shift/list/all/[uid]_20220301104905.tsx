import ShiftsAll from "../../../../components/organisms/user/ShiftAll";
import Header from "../../../../components/templates/HeaderNext";
import HeaderAtMd from "../../../../components/templates/Header";
import { Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { createMedia } from "@artsy/fresnel";
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 1024,
    xl: 1200,
  },
});

export default function SpacePage() {
  return (
    <>
      <MediaContextProvider>
        <Media greaterThan="md">
          <Header>
            <Box mt={10}>
              <ShiftsAll />
            </Box>
          </Header>
        </Media>
        <Media at="md">
          <HeaderAtMd />
          <Box m={3}>
            <ShiftsAll />
          </Box>
        </Media>
      </MediaContextProvider>
    </>
  );
}
