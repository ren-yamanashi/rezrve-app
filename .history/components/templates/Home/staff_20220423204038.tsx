import ReserveToday from "../../organisms/teacher/ReservesToday";
import SelectToday from "../../organisms/teacher/selectday";
import Header from "../Header/Header_Staff";
import HeaderAtMd from "../Header/Header";
import { Box } from "@mui/material";
import { createMedia } from "@artsy/fresnel";
import Title from "../../atoms/Text/PrimaryTitle";
import CardComponent from "../../atoms/Card/CardComponent";
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 700,
    lg: 990,
    xl: 1200,
  },
});
const HomePage_Teacher = () => {
  return (
    <>
      <MediaContextProvider>
        <Media greaterThan="md">
          <Header>
            <Box mt={10}>
              <ReserveToday />
              <Box mt={5}>
                <CardComponent>
                  <Title>今日のスケジュール</Title>
                  <SelectToday />
                </CardComponent>
              </Box>
            </Box>
          </Header>
        </Media>
        <Media at="md">
          <HeaderAtMd />
          <Box mt={2}>
            <ReserveToday />
            <Box mt={5}>
              <CardComponent>
                <Title>今日のスケジュール</Title>
                <SelectToday />
              </CardComponent>
            </Box>
          </Box>
        </Media>
        <Media at="sm">
          <HeaderAtMd />
          <Box>
            <ReserveToday />
            <Box mt={5}>
              <CardComponent>
                <Title>今日のスケジュール</Title>
                <Box overflow="scroll">
                  <SelectToday />
                </Box>
              </CardComponent>
            </Box>
          </Box>
        </Media>
      </MediaContextProvider>
    </>
  );
};

export default HomePage_Teacher;
