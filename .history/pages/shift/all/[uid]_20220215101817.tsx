import FreeSpaceAll from "../../../components/organisms/FreeSpaceAll";
import Header from "../../../components/templates/HeaderNext";
import { Box } from "@mui/material";

export default function AddPage() {
  return (
    <>
      <Header>
        <Box mt={10}>
          <FreeSpaceAll />
        </Box>
      </Header>
    </>
  );
}
