import UsersList from "../../../components/organisms/manager/UserList";
import Header from "../../../components/templates/Header/HeaderNext";
import HeaderAtMd from "../../../components/templates/Header/Header";
import Title from "../../../components/atoms/Text/PrimaryTitle";
import { createMedia } from "@artsy/fresnel";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import CardComponent from "../../../components/atoms/Card/CardComponent";
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

export default function SpacePage() {
  return (
    <>
      <MediaContextProvider>
        <Media greaterThan="md">
          <Header>
            <Box mt={10}>
              <UsersList />
            </Box>
          </Header>
        </Media>
        <Media at="md">
          <HeaderAtMd />
          <CardComponent>
            <Box>
              <UsersList />
            </Box>
          </CardComponent>
        </Media>
        <Media at="sm">
          <Box mt={5} ml={2} mr={2} display="flex">
            <Title>管理者ページは、 スマートフォンでの閲覧はできません</Title>
          </Box>
        </Media>
      </MediaContextProvider>
      <ToastContainer />
    </>
  );
}
