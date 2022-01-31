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
import Reserve from "../../components/organisms/Reserves";
import Header from "../../components/templates/Header";
import { useAuth } from "../../hooks/useUserAuth";

type Query = {
  uid: string;
};

export default function ReservePage() {
  const [user2, setUser] = useState<User>();
  const router = useRouter();
  const { user } = useAuth();
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
      <Reserve />
    </>
  );
}
