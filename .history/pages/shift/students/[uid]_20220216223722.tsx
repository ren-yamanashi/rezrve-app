import YoyakuSeito from "../../../components/organisms/student/YoyakuDay";
import Header from "../../../components/templates/HeaderNext";
import Box from "@mui/material/Box";

export default function SpacePage() {
  return (
    <>
      <Header>
        <Box mt={10}>
          <YoyakuSeito />
        </Box>
      </Header>
    </>
  );
}
