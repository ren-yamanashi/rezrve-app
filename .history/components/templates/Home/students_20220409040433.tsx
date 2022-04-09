import YoyakuListToday from "../../../components/organisms/student/yoyakuListToday";
import Header from "../../../components/templates/Header/Header2";
import RsvPage from "../../../components/organisms/student/RsvPage";
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

export default function HomePage_Students() {
  return (
    <>
      <MediaContextProvider>
        <Media greaterThan="md">
          <Header />
          <Box my={3} mx={10}>
            <YoyakuListToday />
          </Box>
          <Box m={10}>
            <RsvPage />
          </Box>
        </Media>
        <Media at="md">
          <Header />
          <Box my={3} mx={3}>
            <YoyakuListToday />
          </Box>
          <Box m={3}>
            <RsvPage />
          </Box>
        </Media>
        <Media at="sm">
          <Header />
          <Box mb={1}>
            <YoyakuListToday />
          </Box>
          <Box my={3}>
            <RsvPage />
          </Box>
        </Media>
      </MediaContextProvider>
    </>
  );
}
