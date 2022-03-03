import UsersList from "../../components/organisms/user/UserList";
import Header from "../../components/templates/HeaderNext";
import HeaderAtMd from "../../components/templates/Header";
import { createMedia } from "@artsy/fresnel";
import { Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 1024,
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
      </MediaContextProvider>
    </>
  );
}
