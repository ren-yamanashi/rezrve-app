import ReservesAll from "../../../components/organisms/ReservesAll";
import Header from "../../../components/templates/HeaderNext";
import { Box } from "@mui/material";
export default function ReserveAllPage() {
  return (
    <>
      <Header>
        <Box mt={10}>
          <ReservesAll />
        </Box>
      </Header>
    </>
  );
}
