import AddFixedReserve from "../../../components/organisms/AddFixedReserve";
import Header from "../../../components/templates/HeaderNext";
import { Box } from "@mui/material";

export default function AddPage() {
  return (
    <>
      <Header>
        <Box mt={10}>
          <AddFixedReserve />
        </Box>
      </Header>
    </>
  );
}
