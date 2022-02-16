import YoyakuDate from "../../../components/organisms/manager/YoyakuDay";
import Header from "../../../components/templates/HeaderNext";
import Box from "@mui/material/Box";

export default function SpacePage() {
  return (
    <>
      <Header>
        <Box mt={10}>
          <YoyakuDate />
        </Box>
      </Header>
    </>
  );
}
