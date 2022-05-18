import TeachersRsv from "../../../organisms/student/TeachersRsv";
import TeachersRsvAtPhone from "../../../organisms/student/TeachersRsvAtPhone";
import HeaderAtMd from "../../Header/Header4";
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
  console.log(props.reserves);
  return (
    <>
      <MediaContextProvider>
        <Media greaterThan="md">
          <HeaderAtMd />
          <TeachersRsv
            user={props.user}
            reserves={props.reserver}
            times={props.times}
          />
        </Media>
        <Media at="md">
          <HeaderAtMd />
          <TeachersRsv
            user={props.user}
            reserves={props.reserver}
            times={props.times}
          />
        </Media>
        <Media at="sm">
          <HeaderAtMd />
          <TeachersRsvAtPhone
            user={props.user}
            reserves={props.reserver}
            times={props.times}
          />
        </Media>
      </MediaContextProvider>
    </>
  );
};

export default Rsv_Teacher;
