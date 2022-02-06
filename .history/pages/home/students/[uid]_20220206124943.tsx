import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, FormEvent } from "react";
//内部インポート
import { User } from "../../../models/User";
import ReserveToday from "../../../components/organisms/ReservesToday";
import FreeSpaceToday from "../../../components/organisms/FreeSpaceToday";
import ScheduleSeitoToday from "../../../components/organisms/student/scheduleToday";
import Header from "../../../components/templates/Header";

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
      <Header />
      <ReserveToday />
      <FreeSpaceToday />
      <ScheduleSeitoToday />
    </>
  );
}
