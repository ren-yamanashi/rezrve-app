import UploadFile from "../../../components/organisms/upload/image";
import Header from "../../../components/templates/HeaderNext";
import Header2 from "../../../components/templates/Header";
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

export default function TestPage() {
  return (
    <>
      <MediaContextProvider>
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
