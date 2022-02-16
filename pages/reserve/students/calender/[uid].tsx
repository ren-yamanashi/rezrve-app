import CalendarStudent from "../../../../components/organisms/student/Calender";
import Header from "../../../../components/templates/HeaderNext";
import Box from "@mui/material/Box";

export default function SpacePage() {
  return (
    <>
      <Header>
        <Box mt={10}>
          <CalendarStudent />
        </Box>
      </Header>
    </>
  );
}
