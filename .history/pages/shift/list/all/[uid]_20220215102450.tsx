import ShiftsAll from "../../../../components/organisms/user/ShiftAll";
import Header from "../../../../components/templates/HeaderNext";
import { Box } from "@mui/material";

export default function SpacePage() {
  return (
    <>
      <Header>
        <Box mt={10}>
          <ShiftsAll />
        </Box>
      </Header>
    </>
  );
}
