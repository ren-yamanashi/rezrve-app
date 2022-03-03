import Chat from "../../components/organisms/chat/Chat";
import Header from "../../components/templates/HeaderNext";
import { Box } from "@mui/material";

export default function ChatPage() {
  return (
    <>
      <Header>
        <Box mt={15}>
          <Chat />
        </Box>
      </Header>
    </>
  );
}
