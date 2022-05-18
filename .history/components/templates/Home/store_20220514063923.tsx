import YoyakuListToday from "../../organisms/manager/YoyakuListToday";
import Header from "../Header/HeaderNext";
import HeaderAtMd from "../Header/Header";
import RsvPage from "../../organisms/manager/RsvPage";
import { Box } from "@mui/material";
import CardComponent from "../../atoms/Card/CardComponent";
import Title from "../../atoms/Text/PrimaryTitle";
import { createMedia } from "@artsy/fresnel";
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

const HomePage_Manager = (props) => {
  return (
    <>
      <MediaContextProvider>
        <Media greaterThan="md">
          <Header>
            <Box m={10}>
              <YoyakuListToday reserved={props.reserved} />
              <Box mt={5}>
                <CardComponent>
                  <RsvPage />
                </CardComponent>
              </Box>
            </Box>
          </Header>
        </Media>
        <Media at="md">
          <HeaderAtMd />
          <Box>
            <YoyakuListToday reserved={props.reserved} />
            <Box mt={5}>
              <CardComponent>
                <RsvPage />
              </CardComponent>
            </Box>
          </Box>
        </Media>
        <Media at="sm">
          <Box mt={5} ml={2} mr={2} display="flex">
            <Title>管理者ページは、 スマートフォンでの閲覧はできません</Title>
          </Box>
        </Media>
      </MediaContextProvider>
    </>
  );
};

export default HomePage_Manager;
