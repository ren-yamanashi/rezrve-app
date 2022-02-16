import SelectDay from "../../components/organisms/calender/selectday";
import Header from "../../components/templates/HeaderNext";
import { Box } from "@mui/material";

export default function AddPage() {
  return (
    <>
      <Header>
        <Box mt={10}>
          <SelectDay />
        </Box>
      </Header>
    </>
  );
}
