import Chat from "../../components/organisms/chat/Chat";
import Header from "../../components/templates/HeaderNext";
import HeaderAtMd from "../../components/templates/Header";
import { Box } from "@mui/material";
import { createMedia } from "@artsy/fresnel";
import Title from "../../components/atoms/Title";

//MediaQuery設定
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1220,
  },
});

export default function ChatPage() {
  return (
    <>
      <MediaContextProvider>
        <Media greaterThan="md">
          <Header>
            <Box mt={15}>
              <Chat />
            </Box>
          </Header>
        </Media>
        <Media at="md">
          <HeaderAtMd />

          <Chat />
        </Media>
      </MediaContextProvider>
    </>
  );
}
