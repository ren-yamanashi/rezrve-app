import "../styles/globals.css";
import "../lib/firebase";
import { RecoilRoot } from "recoil";

const MyApp = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
};

export default MyApp;
