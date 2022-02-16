import Calender1 from "../../components/organisms/calender/Calender";
import Header from "../../components/templates/HeaderNext";
import { Box } from "@mui/material";

export default function AddPage() {
  return (
    <>
      <Header>
        <Box mt={10}>
          <Calender1 />
        </Box>
      </Header>
    </>
  );
}
