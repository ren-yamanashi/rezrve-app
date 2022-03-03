import Shifts from "../../../components/organisms/user/Shift";
import Header from "../../../components/templates/HeaderNext";
import { Box } from "@mui/material";

export default function SpacePage() {
  return (
    <>
      <Header>
        <Box mt={10}>
          <Shifts />
        </Box>
      </Header>
    </>
  );
}
