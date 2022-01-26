//外部インポート
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  runTransaction,
} from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, FormEvent, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import { ReserveList } from "../../models/ReserveList";
import Header from "../templates/Header";
//queryの方を準備
type Query = {
  id: string;
};

/**===============
 * @returns 予約登録画面の作成
 *===============*/
export default function AddFixedReserve() {
  const router = useRouter();
  const query = router.query as Query;
  const [reserves, setReserves] = useState<ReserveList>();
  //フォームの入力内容をステートに保管
  const { user } = useAuth();
  const [student, setStudent] = useState("");
  const [course, setCourse] = useState("");
  //collection設定
  function getCollections() {
    const db = getFirestore();
    return {
      db,
      reserveCollection: collection(db, "FreeSpace"),
    };
  }
  /**================
   * Firebaseからシフトを取り出す
   *===============*/
  async function loadReserve() {
    if (query.id === undefined) {
      return;
    }
    const { reserveCollection } = getCollections();
    const reserveDoc = await getDoc(doc(reserveCollection, query.id)); //idを取り出す
    if (!reserveDoc.exists()) {
      return;
    }
    const gotReserve = reserveDoc.data() as ReserveList;
    gotReserve.id = reserveDoc.id;
    setReserves(gotReserve);
  }
  /**==========
   * 予約登録
   *==========*/
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { db, reserveCollection } = getCollections();
    const reserveRef = doc(reserveCollection);
    await runTransaction(db, async (t: any) => {
      t.update(doc(reserveCollection, reserves.id), {
        student,
        course,
      });
    });
    setStudent("");
    setCourse("");
    router.push(`/shift/${user.uid}`);
  }
  useEffect(() => {
    loadReserve();
  }, [query.id]);
  return (
    <>
      <Header />
      <React.Fragment>
        <Box textAlign="center" mb={10}>
          <Typography variant="h6" gutterBottom>
            予約登録
          </Typography>
        </Box>
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
          <Box sx={{ mt: 1 }} width="30vw" margin="auto">
            <TextField
              margin="normal"
              required
              id="studentName"
              name="studentName"
              label="生徒名"
              fullWidth
              autoComplete="studentName"
              variant="standard"
              onChange={(e) => setStudent(e.target.value)}
            />
          </Box>
          <Box sx={{ mt: 1 }} width="30vw" margin="auto">
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                コース
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Vo"
                />
                <FormControlLabel value="male" control={<Radio />} label="Gt" />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Ba"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="DJ"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Uk"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Pf"
                />
                <FormControlLabel
                  value="disabled"
                  control={<Radio />}
                  label="Vi"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box width="10vw" margin="auto" mt={5}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              登録
            </Button>
          </Box>
          <Box
            py={10}
            pr="20vw"
            textAlign="right"
            fontSize={20}
            borderRadius={2}
          >
            <Link href={`/shift/${user?.uid}`}>戻る</Link>
          </Box>
        </Box>
      </React.Fragment>
    </>
  );
}
