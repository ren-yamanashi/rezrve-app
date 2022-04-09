import UsersList from "../../components/organisms/user/UserList";
import Header from "../../components/templates/HeaderNext";
import HeaderAtMd from "../../components/templates/Header";
import Title from "../../components/atoms/Text/PrimaryTitle";
import { createMedia } from "@artsy/fresnel";
import { Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { ToastContainer } from "react-toastify";
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
          <CardContent
            style={{
              width: "95%",
              borderRadius: "7px",
              borderStyle: "solid",
              borderWidth: "2px",
              borderColor: "#4689FF",
              margin: "auto",
            }}
          >
            <Box>
              <UsersList />
            </Box>
          </CardContent>
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
