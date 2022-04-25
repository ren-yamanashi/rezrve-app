import YoyakuListToday from "../../../components/organisms/student/yoyakuListToday";
import Header from "../../../components/templates/Header/Header4";
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

const HomePage_Students = () => {
  return (
    <>
      <MediaContextProvider>
        <Media greaterThan="md">
          <Header />
          <Box m={10}>
            <RsvPage />
          </Box>
        </Media>
        <Media at="md">
          <Header />
          <Box m={3}>
            <RsvPage />
          </Box>
        </Media>
        <Media at="sm">
          <Header />
          <Box my={3}>
            <RsvPage />
          </Box>
        </Media>
      </MediaContextProvider>
    </>
  );
};

export default HomePage_Students;
