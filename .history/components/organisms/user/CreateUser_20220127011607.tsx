import { User } from "../../../models/User";
import React, { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../hooks/useUserAuth";
import { browser } from "process";

import dayjs from "dayjs";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { Checkbox, TextField } from "@mui/material";
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

import Title from "../../atoms/Title";

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
  return (
    <React.Fragment>
      <Box ml={3}>
        <Title>講師一覧</Title>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>講師名</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{user.uid}</TableBody>
      </Table>
    </React.Fragment>
  );
}
