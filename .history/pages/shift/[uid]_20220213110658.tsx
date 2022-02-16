import FreeSpace from "../../components/organisms/FreeSpace";
import Header from "../../components/templates/HeaderNext";
import { Box } from "@mui/material";

export default function SpacePage() {
  return (
    <>
      <Header>
        <Box mt={10}>
          <FreeSpace />
        </Box>
      </Header>
    </>
  );
}
