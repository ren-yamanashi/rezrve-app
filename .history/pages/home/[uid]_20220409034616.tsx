import ReserveToday from "../../components/organisms/ReservesToday";
import SelectToday from "../../components/organisms/teacher/selectday";
import Header from "../../components/templates/HeaderNext";
import HeaderAtMd from "../../components/templates/Header";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/material";
import { createMedia } from "@artsy/fresnel";
import Title from "../../components/atoms/Text/PrimaryTitle";
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 700,
    lg: 990,
    xl: 1200,
  },
});
export default function HomePage() {
  return (
    <>
      <MediaContextProvider>
        <Media greaterThan="md">
          <Header>
            <Box mt={10}>
              <ReserveToday />
              <Box mt={5}>
                <CardContent
                  style={{
                    width: "95%",
                    borderRadius: "7px",
                    borderStyle: "solid",
                    borderWidth: "2px",
                    borderColor: "#4689FF",
                    margin: "auto",
                  }}
                >
                  <Title>今日のスケジュール</Title>
                  <SelectToday />
                </CardContent>
              </Box>
            </Box>
          </Header>
        </Media>
        <Media at="md">
          <HeaderAtMd />
          <Box mt={2}>
            <ReserveToday />
            <Box mt={5}>
              <CardContent
                style={{
                  width: "95%",
                  borderRadius: "7px",
                  borderStyle: "solid",
                  borderWidth: "2px",
                  borderColor: "#4689FF",
                  margin: "auto",
                }}
              >
                <Title>今日のスケジュール</Title>
                <SelectToday />
              </CardContent>
            </Box>
          </Box>
        </Media>
        <Media at="sm">
          <HeaderAtMd />
          <Box>
            <ReserveToday />
            <Box mt={5}>
              <CardContent
                style={{
                  width: "95%",
                  borderRadius: "7px",
                  borderStyle: "solid",
                  borderWidth: "2px",
                  borderColor: "#4689FF",
                  margin: "auto",
                }}
              >
                <Title>今日のスケジュール</Title>
                <Box overflow="scroll">
                  <SelectToday />
                </Box>
              </CardContent>
            </Box>
          </Box>
        </Media>
      </MediaContextProvider>
    </>
  );
}
