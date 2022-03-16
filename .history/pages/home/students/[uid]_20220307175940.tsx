import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, FormEvent, Children } from "react";
//内部インポート
import { User } from "../../../models/User";
import YoyakuListToday from "../../../components/organisms/student/yoyakuListToday";

import Header from "../../../components/templates/Header2";
import Header2 from "../../../components/templates/Header";
import RsvPage from "../../../components/organisms/student/RsvPage";
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
        <Media greaterThan="md">
          <Header />
          <Box my={3} mx={10}>
            <YoyakuListToday />
          </Box>
          <Box m={10}>
            <RsvPage />
          </Box>
        </Media>
        <Media at="md">
          <Header />
          <Box my={3} mx={3}>
            <YoyakuListToday />
          </Box>
          <Box m={3}>
            <RsvPage />
          </Box>
        </Media>
        <Media at="sm">
          <Header />
          <Box my={3}>
            <YoyakuListToday />
          </Box>
          <Box m={3}>
            <RsvPage />
          </Box>
        </Media>
      </MediaContextProvider>
    </>
  );
}
