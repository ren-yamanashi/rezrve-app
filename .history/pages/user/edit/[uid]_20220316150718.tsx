import EditReserve from "../../../components/organisms/user/CreateUser";
import Header from "../../../components/templates/HeaderNext";
import HeaderAtMd from "../../../components/templates/Header";
import { Box } from "@mui/material";
import { createMedia } from "@artsy/fresnel";
import Title from "../../../components/atoms/Title";
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
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
              <EditReserve />
            </Box>
          </Header>
        </Media>
        <Media at="md">
          <HeaderAtMd />
          <EditReserve />
        </Media>
        <Media at="sm">
          <HeaderAtMd />
          <EditReserve />
        </Media>
      </MediaContextProvider>
    </>
  );
}
