import "../styles/globals.css";
import "../lib/firebase";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
