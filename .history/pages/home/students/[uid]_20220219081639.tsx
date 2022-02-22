import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, FormEvent } from "react";
//内部インポート
import { User } from "../../../models/User";
import YoyakuListToday from "../../../components/organisms/student/yoyakuListToday";
import YoyakuToday from "../../../components/organisms/student/yoyakuToday";
import Header from "../../../components/templates/HeaderNext";
import Header2 from "../../../components/templates/Header";
import RsvPage from "../../../components/organisms/student/RsvPage";
import { Box } from "@mui/material";
import { createMedia } from "@artsy/fresnel";
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 1000,
    xl: 1200,
  },
});
type Query = {
  uid: string;
};

export default function HomePage() {
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const query = router.query as Query;

  useEffect(() => {
    if (query.uid === undefined) {
      return;
    }
    //Firebase からユーザーを取り出す
    async function loadUser() {
      const db = getFirestore();
      const ref = doc(collection(db, "users"), query.uid);
      const UserDoc = await getDoc(ref);
      if (!UserDoc.exists()) {
        return;
      }
      const gotUser = UserDoc.data() as User;
      gotUser.uid = UserDoc.id;
      setUser(gotUser);
    }
    loadUser();
  }, [query.uid]);
  return (
    <>
      <MediaContextProvider>
        <Media at="sm">
          <Header2 />
          <Box m={2}>
            <Box mt={5}>
              <YoyakuListToday />
            </Box>
          </Box>
        </Media>
        <Media greaterThan="sm">
          <Header>
            <Box m={10}>
              <RsvPage />
              <Box mt={5}>
                <YoyakuListToday />
              </Box>
            </Box>
          </Header>
        </Media>
      </MediaContextProvider>
    </>
  );
}
