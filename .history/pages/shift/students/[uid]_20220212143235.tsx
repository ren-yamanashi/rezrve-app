import YoyakuSeito from "../../../components/organisms/student/yoyaku";
import Header from "../../../components/templates/HeaderNext";
import Box from "@mui/material/Box";

export default function SpacePage() {
  return (
    <>
      <Header>
        <Box m={10}>
          <YoyakuSeito />
        </Box>
      </Header>
    </>
  );
}
