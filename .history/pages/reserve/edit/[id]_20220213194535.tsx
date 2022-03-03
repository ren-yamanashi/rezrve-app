import EditReserve from "../../../components/organisms/rsv/EditReserve";
import Header from "../../../components/templates/HeaderNext";
import { Box } from "@mui/material";

export default function AddPage() {
  return (
    <>
      <Header>
        <Box mt={10}>
          <EditReserve />
        </Box>
      </Header>
    </>
  );
}
