import YoyakuList from "../../../../components/organisms/student/yoyakuList";
import Header from "../../../../components/templates/HeaderNext";
import { Box } from "@mui/material";

export default function AddPage() {
  return (
    <>
      <Header>
        <Box mt={10}>
          <YoyakuList />
        </Box>
      </Header>
    </>
  );
}
