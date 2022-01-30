import { User } from "../../../models/User";
import React, { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../hooks/useUserAuth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  runTransaction,
  query,
  where,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

type Query = {
  uid: string;
};
export default function EditUserPage() {
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const query = router.query as Query;
  const { user: currentUser } = useAuth();
  const [sending, setSending] = useState(false);
  const db = getFirestore();
  //collection設定
  function getCollections() {
    const db = getFirestore();
    return {
      db,
      userCollection: collection(db, "user"),
    };
  }

  useEffect(() => {
    if (query.uid === undefined) {
      return;
    }
    /**=======
     * Firebaseからユーザーを取り出す
     *=======*/
    async function loadUser() {
      const userRef = doc(collection(db, "users"), query.uid);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        return;
      }
      const gotUser = userDoc.data() as User;
      gotUser.uid = userDoc.id;
      setUser(gotUser);
    }
    loadUser();
  }, [query.uid]);
  /**
   * ユーザー登録
   */
  async function onSubmit(e: FormEvent<HTMLInputElement>) {
    e.preventDefault();

    const { db, userCollection } = getCollections();
    const reserveRef = doc(userCollection);
    await runTransaction(db, async (t: any) => {
      t.update(doc(userCollection, user.uid), {
        name,
        reserved: true,
      });
    });
  }
}
