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
import FreeSpaceToday from "../../components/organisms/FreeSpaceToday";
import SelectToday from "../../components/organisms/calender/SelectToday";
import Header from "../../components/templates/HeaderNext";
import { Box } from "@mui/material";

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
      <Header>
        <Box mt={10}>
          <ReserveToday />
          <Box mt={5}>
            <SelectToday />
          </Box>
        </Box>
      </Header>
    </>
  );
}
