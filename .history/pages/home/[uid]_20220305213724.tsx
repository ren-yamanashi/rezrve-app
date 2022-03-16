import {
  collection,
  doc,
  getDoc,
  getFirestore,
  Timestamp,
} from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, FormEvent } from "react";
//内部インポート
import { User } from "../../models/User";
import ReserveToday from "../../components/organisms/ReservesToday";

import SelectToday from "../../components/organisms/calender/SelectToday";
import Header from "../../components/templates/HeaderNext";
import HeaderAtMd from "../../components/templates/Header";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/material";
import { createMedia } from "@artsy/fresnel";
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 700,
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
                <SelectToday />
              </CardContent>
            </Box>
          </Box>
        </Media>
        <Media at="sm">
          <HeaderAtMd />
          <Box>
            <ReserveToday />
          </Box>
        </Media>
      </MediaContextProvider>
    </>
  );
}
