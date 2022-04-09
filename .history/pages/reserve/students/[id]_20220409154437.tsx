import TeachersRsv from "../../../components/organisms/student/TeachersRsv";
import TeachersRsvAtPhone from "../../../components/organisms/student/TeachersRsvAtPhone";
import HeaderAtMd from "../../../components/templates/Header/Header2";
import { createMedia } from "@artsy/fresnel";
// Create Media
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
          <HeaderAtMd />
          <TeachersRsv />
        </Media>
        <Media at="md">
          <HeaderAtMd />
          <TeachersRsv />
        </Media>
        <Media at="sm">
          <HeaderAtMd />
          <TeachersRsvAtPhone />
        </Media>
      </MediaContextProvider>
    </>
  );
}
