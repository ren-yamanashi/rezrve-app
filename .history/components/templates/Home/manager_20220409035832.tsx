import YoyakuListToday from "../../../components/organisms/manager/YoyakuListToday";
import Header from "../../../components/templates/Header/HeaderNext";
import HeaderAtMd from "../../../components/templates/Header/Header";
import RsvPage from "../../../components/organisms/manager/RsvPage";
import { Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardComponent from "../../atoms/Card/CardComponent";
import Title from "../../../components/atoms/Text/PrimaryTitle";
import { createMedia } from "@artsy/fresnel";
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

export default function HomePage() {
  return (
    <>
      <MediaContextProvider>
        <Media greaterThan="md">
          <Header>
            <Box m={10}>
              <YoyakuListToday />
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
            <YoyakuListToday />
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
}
