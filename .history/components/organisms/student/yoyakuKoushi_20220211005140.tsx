//外部インポート
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
import dayjs from "dayjs";
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
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import Header from "../../templates/Header";
import { FreeList } from "../../../models/FreeList";
import { Users } from "../../../models/Users";
//queryの方を準備
type Query = {
  id: string;
};
//Itemのスタイル
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  backgroundColor: "#FFFFDD",
}));
const Item2 = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
/**===============
 * @returns 予約編集画面の作成　キャンセル・生徒名/コースの変更が可能
 *===============*/
export default function EditReserve() {
  const router = useRouter();
  const query_ = router.query as Query;
  const [users, setUsers] = useState<Users>();
  const [reserves, setReserves] = useState<FreeList>();
  //フォームの入力内容をステートに保管
  const { user } = useAuth();
  const [student, setStudent] = useState("");
  const [course, setCourse] = useState("");
  const [test, setTest] = useState<string>("");
  const [err, setErr] = useState<boolean>(false);
  //collection設定
  function getCollections() {
    const db = getFirestore();
    return {
      db,
      usersCollection: collection(db, "users"),
    };
  }
  /**================
   * Firebaseからシフトを取り出す
   *===============*/
  async function loadUser() {
    if (query_.id === undefined) {
      return;
    }
    const { usersCollection } = getCollections();
    const userDoc = await getDoc(doc(usersCollection, query_.id)); //idを取り出す
    if (!userDoc.exists()) {
      return;
    }
    const gotUser = userDoc.data() as Users;
    gotUser.id = userDoc.id;
    setUsers(gotUser);
  }
  useEffect(() => {
    loadUser();
  }, [query_.id]);
  return (
    <>
      <React.Fragment>
        <CardContent
          style={{
            width: "95%",
            borderRadius: "7px",
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "#4689FF",
            margin: "auto",
          }}
        >
          <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
            予約情報
          </Typography>
          <>
            {users && (
              <Grid container spacing={2} margin="0 auto">
                <Grid item xs={11} md={11} mt={4}>
                  <Item>
                    <Box display="flex">
                      <Grid item xs={10} md={11} my="auto">
                        <Typography
                          variant="h5"
                          component="div"
                          ml={5}
                          color="black"
                          textAlign="left"
                          fontSize={17}
                        >
                          予約者名
                        </Typography>
                      </Grid>
                    </Box>
                  </Item>
                </Grid>
                <Grid item xs={11} md={11}>
                  <Item2>
                    <Box display="flex">
                      <Grid item xs={10} md={11} my="auto">
                        <Typography
                          variant="h5"
                          component="div"
                          ml={5}
                          color="black"
                          textAlign="left"
                          fontSize={17}
                        >
                          担当者名
                        </Typography>
                      </Grid>
                    </Box>
                  </Item2>
                </Grid>
                <Grid item xs={11} md={11}>
                  <Item>
                    <Box display="flex">
                      <Grid item xs={10} md={11} my="auto">
                        <Typography
                          variant="h5"
                          component="div"
                          ml={5}
                          color="black"
                          textAlign="left"
                          fontSize={17}
                        >
                          コース
                        </Typography>
                      </Grid>
                    </Box>
                  </Item>
                </Grid>
                <Grid item xs={11} md={11}>
                  <Item2>
                    <Box display="flex">
                      <Grid item xs={10} md={11} my="auto">
                        <Typography
                          variant="h5"
                          component="div"
                          ml={5}
                          color="black"
                          textAlign="left"
                          fontSize={17}
                        >
                          予約日
                        </Typography>
                      </Grid>
                    </Box>
                  </Item2>
                </Grid>
                <Grid item xs={11} md={11}>
                  <Item>
                    <Box display="flex">
                      <Grid item xs={10} md={11} my="auto">
                        <Typography
                          variant="h5"
                          component="div"
                          ml={5}
                          color="black"
                          fontSize={17}
                          textAlign="left"
                        >
                          予約時間
                        </Typography>
                      </Grid>
                    </Box>
                  </Item>
                </Grid>
                <Grid item xs={11} md={11}>
                  <Item2>
                    <Box display="flex">
                      <Grid item xs={10} md={11} my="auto">
                        <Typography
                          variant="h5"
                          component="div"
                          ml={5}
                          color="black"
                          fontSize={17}
                          textAlign="left"
                        >
                          予約受付日時
                        </Typography>
                      </Grid>
                    </Box>
                  </Item2>
                </Grid>
              </Grid>
            )}
          </>
        </CardContent>
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
