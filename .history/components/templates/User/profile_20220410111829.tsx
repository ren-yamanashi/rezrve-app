import UploadFile from "../../../components/organisms/upload/image";
import Header from "../../../components/templates/Header/HeaderNext";
import Header2 from "../../../components/templates/Header/Header";
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

export default function ProfilePage() {
  return (
    <>
      <MediaContextProvider>
        <Media at="sm">
          <Header2 />
          <UploadFile />
        </Media>
        <Media at="md">
          <Header2 />
          <UploadFile />
        </Media>
        <Media greaterThan="md">
          <Header>
            <Box mt={10}>
              <UploadFile />
            </Box>
          </Header>
        </Media>
      </MediaContextProvider>
    </>
  );
}
