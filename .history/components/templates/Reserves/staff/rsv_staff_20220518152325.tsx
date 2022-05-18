import TeachersRsv from "../../../organisms/student/TeachersRsv";
import TeachersRsvAtPhone from "../../../organisms/student/TeachersRsvAtPhone";
import HeaderAtMd from "../../Header/Header3";
import { createMedia } from "@artsy/fresnel";
// Create Media
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1220,
  },
});

const Rsv_Teacher = (props) => {
  return (
    <>
      <MediaContextProvider>
        <Media greaterThan="md">
          <HeaderAtMd />
          <TeachersRsv
            user={props.user}
            reserves={props.reserves}
            times={props.times}
            staffs={props.staffs}
          />
        </Media>
        <Media at="md">
          <HeaderAtMd />
          <TeachersRsv
            user={props.user}
            reserves={props.reserves}
            times={props.times}
            staffs={props.staffs}
          />
        </Media>
        <Media at="sm">
          <HeaderAtMd />
          <TeachersRsvAtPhone
            user={props.user}
            reserves={props.reserves}
            times={props.times}
            staffs={props.staffs}
          />
        </Media>
      </MediaContextProvider>
    </>
  );
};

export default Rsv_Teacher;
