import CalenderAll from "../../../components/organisms/calender/CalenderAll";
import Header from "../../../components/templates/HeaderNext";

import { Box } from "@mui/material";

export default function AddPage() {
  return (
    <>
      <Header>
        <Box mt={10}>
          <CalenderAll />
        </Box>
      </Header>
    </>
  );
}
