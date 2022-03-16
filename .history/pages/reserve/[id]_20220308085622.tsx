import TeachersRsv from "../../components/organisms/student/TeachersRsv";
import Header from "../../components/templates/HeaderNext";
import HeaderAtMd from "../../components/templates/Header";
import { createMedia } from "@artsy/fresnel";
import Title from "../../components/atoms/Title";
import { Box } from "@mui/material";
//MediaQuery設定
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1220,
  },
});

export default function AddPage() {
  return (
    <>
      <MediaContextProvider>
        <Media greaterThan="md">
          <Header>
            <Box mt={10}>
              <TeachersRsv />
            </Box>
          </Header>
        </Media>
        <Media at="md">
          <HeaderAtMd />
          <TeachersRsv />
        </Media>
        <Media at="sm">
          <HeaderAtMd />
          <TeachersRsv />
        </Media>
      </MediaContextProvider>
    </>
  );
}
