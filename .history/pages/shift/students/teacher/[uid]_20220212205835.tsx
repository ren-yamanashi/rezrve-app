import YoyakuTeacher from "../../../../components/organisms/student/YoyakuTeacher";
import Header from "../../../../components/templates/HeaderNext";
import Box from "@mui/material/Box";

export default function SpacePage() {
  return (
    <>
      <Header>
        <Box mt={10}>
          <YoyakuTeacher />
        </Box>
      </Header>
    </>
  );
}
