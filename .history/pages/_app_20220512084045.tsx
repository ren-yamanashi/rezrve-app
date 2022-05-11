import "../styles/globals.css";
import "../lib/firebase";
import { RecoilRoot } from "recoil";
import { AuthProvider } from "../hooks/useUserAuth";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </AuthProvider>
  );
};

export default MyApp;
