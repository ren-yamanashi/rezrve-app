import ReserveToday from "../../organisms/staff/ReservesToday";
import SelectToday from "../../organisms/staff/Schedule";
import Header from "../Header/Header_Staff";
import HeaderAtMd from "../Header/Header";
import { Box } from "@mui/material";
import { createMedia } from "@artsy/fresnel";
import Title from "../../atoms/Text/PrimaryTitle";
import CardComponent from "../../atoms/Card/CardComponent";
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 700,
    lg: 990,
    xl: 1200,
  },
});
const HomePage_Teacher = (props) => {
  return (
    <>
      <MediaContextProvider>
        <Media greaterThan="md">
          <Header>
            <Box mt={10}>
              <ReserveToday reserves_true={props.reserves_true} />
              <Box mt={5}>
                <CardComponent>
                  <Title>今日のスケジュール</Title>
                  <SelectToday
                    reserves={props.reserves_all}
                    staffs={props.staffs}
                    times={props.times}
                    user={props.user}
                  />
                </CardComponent>
              </Box>
            </Box>
          </Header>
        </Media>
        <Media at="md">
          <HeaderAtMd />
          <Box mt={2}>
            <ReserveToday reserves_true={props.reserves_true} />
            <Box mt={5}>
              <CardComponent>
                <Title>今日のスケジュール</Title>
                <SelectToday
                  reserves={props.reserves_all}
                  staffs={props.staffs}
                  times={props.times}
                  user={props.user}
                />
              </CardComponent>
            </Box>
          </Box>
        </Media>
        <Media at="sm">
          <HeaderAtMd />
          <Box>
            <ReserveToday reserves_true={props.reserves_true} />
            <Box mt={5}>
              <CardComponent>
                <Title>今日のスケジュール</Title>
                <Box overflow="scroll">
                  <SelectToday
                    reserves={props.reserves_all}
                    staffs={props.staffs}
                    times={props.times}
                    user={props.user}
                  />
                </Box>
              </CardComponent>
            </Box>
          </Box>
        </Media>
      </MediaContextProvider>
    </>
  );
};

export default HomePage_Teacher;
