import EditReserve from "../../../components/organisms/manager/CreateShift";
import Header from "../../../components/templates/HeaderNext";
import { Box } from "@mui/material";

export default function SpacePage() {
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
