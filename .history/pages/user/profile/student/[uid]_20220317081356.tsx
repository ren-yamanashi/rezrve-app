import UploadFile from "../../../../components/organisms/upload/image";
import Header from "../../../../components/templates/Header2";
import Header2 from "../../../../components/templates/Header";
import { Box } from "@mui/material";
import { createMedia } from "@artsy/fresnel";
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 1000,
    xl: 1200,
  },
});

export default function TestPage() {
  return (
    <>
      <MediaContextProvider>
        <Media at="sm">
          <UploadFile />
        </Media>
        <Media greaterThan="sm">
          <UploadFile />
        </Media>
      </MediaContextProvider>
    </>
  );
}
