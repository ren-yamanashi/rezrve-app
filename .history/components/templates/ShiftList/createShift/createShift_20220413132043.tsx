import EditReserve from "../../../../components/organisms/teacher/CreateUser";
import Header from "../../../templates/Header/HeaderNext";
import HeaderAtMd from "../../../../components/templates/Header/Header";
import { Box } from "@mui/material";
import { createMedia } from "@artsy/fresnel";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

const CreateShiftPage = () => {
  return (
    <>
      <MediaContextProvider>
        <Media greaterThan="md">
          <Header>
            <Box mt={10}>
              <EditReserve />
            </Box>
          </Header>
        </Media>
        <Media at="md">
          <HeaderAtMd />
          <EditReserve />
        </Media>
        <Media at="sm">
          <HeaderAtMd />
          <EditReserve />
        </Media>
      </MediaContextProvider>
    </>
  );
};

export default CreateShiftPage;
