import UploadFile from "../../../components/organisms/upload/image";
import Header from "../../../components/templates/HeaderNext";
import { Box } from "@mui/material";

export default function TestPage() {
  return (
    <>
      <Header>
        <Box mt={10}>
          <UploadFile />
        </Box>
      </Header>
    </>
  );
}
