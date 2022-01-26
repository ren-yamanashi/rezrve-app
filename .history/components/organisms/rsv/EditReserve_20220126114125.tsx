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
} from "firebase/firestore";
import Link from "next/link";
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
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { ReserveList } from "../../../models/ReserveList";
import Header from "../../templates/Header";
import { FreeList } from "../../../models/FreeList";
//queryの方を準備
type Query = {
  id: string;
};

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
 * @returns 予約登録画面の作成
 *===============*/
export default function EditReserve() {
  const router = useRouter();
  const query_ = router.query as Query;
  const [reserves, setReserves] = useState<FreeList>();
  const [rsv, setRsv] = useState<FreeList[]>([]);
  //フォームの入力内容をステートに保管
  const { user } = useAuth();
  const [student, setStudent] = useState("");
  const [course, setCourse] = useState("");
  const [reserved, setReserved] = useState<boolean>(false);
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
    if (query_.id === undefined) {
      return;
    }
    const { reserveCollection } = getCollections();
    const reserveDoc = await getDoc(doc(reserveCollection, query_.id)); //idを取り出す
    if (!reserveDoc.exists()) {
      return;
    }
    const gotReserve = reserveDoc.data() as FreeList;
    gotReserve.id = reserveDoc.id;
    if (gotReserve.student !== "") {
      setReserved(true);
    }
    setReserves(gotReserve);
  }
  /**=======
   * キャンセル処理
   *======*/
  const deleteRsv = async (id: string, e: any) => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("senderUid", "==", user.uid)
    );
    e.stopPropagation();
    await updateDoc(doc(db, "FreeSpace", id), {
      student: "",
      reserved: false,
      course: "",
    });
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return;
    }
    const gotRsv = snapshot.docs.map((doc) => {
      const rsv = doc.data() as FreeList;
      rsv.id == doc.id;
      return rsv;
    });
    setRsv(gotRsv);
  };
  /**==========
   * 予約更新
   *==========*/
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { db, reserveCollection } = getCollections();
    const reserveRef = doc(reserveCollection);
    await runTransaction(db, async (t: any) => {
      t.update(doc(reserveCollection, reserves.id), {
        student,
        course,
        reserved: true,
      });
    });
    setStudent("");
    setCourse("");
    router.push(`/shift/${user?.uid}`);
  }
  useEffect(() => {
    loadReserve();
  }, [query_.id]);
  return (
    <>
      <React.Fragment>
        {reserves && (
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={8} mt={4}>
                  <Item>
                    <Box display="flex">
                      <Typography
                        variant="h5"
                        component="div"
                        mr={5}
                        color="black"
                        width="20%"
                      >
                        予約者名 :
                      </Typography>
                      <Typography variant="h5" component="div">
                        {reserves.student}
                      </Typography>
                    </Box>
                  </Item>
                </Grid>
                <Grid item xs={6} md={8}>
                  <Item2>
                    <Box display="flex">
                      <Typography
                        variant="h5"
                        component="div"
                        mr={5}
                        color="black"
                      >
                        担当者名 :
                      </Typography>
                      <Typography variant="h5" component="div">
                        {reserves.teacher}
                      </Typography>
                    </Box>
                  </Item2>
                </Grid>
                <Grid item xs={6} md={8}>
                  <Item>
                    <Box display="flex">
                      <Typography
                        variant="h5"
                        component="div"
                        mr={5}
                        color="black"
                        width="20%"
                      >
                        コース :
                      </Typography>
                      <Typography variant="h5" component="div">
                        {reserves.course}
                      </Typography>
                    </Box>
                  </Item>
                </Grid>
                <Grid item xs={6} md={8}>
                  <Item2>
                    <Box display="flex">
                      <Typography
                        variant="h5"
                        component="div"
                        mr={5}
                        color="black"
                        width="20%"
                      >
                        予約日 :
                      </Typography>
                      <Typography variant="h5" component="div">
                        {reserves.date}
                      </Typography>
                    </Box>
                  </Item2>
                </Grid>
                <Grid item xs={6} md={8}>
                  <Item>
                    <Box display="flex">
                      <Typography
                        variant="h5"
                        component="div"
                        mr={5}
                        color="black"
                      >
                        予約時間 :
                      </Typography>
                      <Typography variant="h5" component="div">
                        {`${reserves.time}:30`}
                      </Typography>
                    </Box>
                  </Item>
                </Grid>
                <Grid item xs={6} md={8}>
                  <Item2>
                    <Box display="flex">
                      <Typography
                        variant="h5"
                        component="div"
                        mr={5}
                        color="black"
                      >
                        予約受付日時 :
                      </Typography>
                      <Typography variant="h5" component="div">
                        {dayjs(reserves.createAt.toDate()).format(
                          "YYYY/MM/DD HH:mm"
                        )}
                      </Typography>
                    </Box>
                  </Item2>
                </Grid>
              </Grid>
            </Box>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  予約編集
                </Typography>

                <Box sx={{ mt: 1 }} width="30vw" margin="auto">
                  <TextField
                    margin="normal"
                    required
                    id="outlined"
                    name="studentName"
                    label="生徒名"
                    fullWidth
                    defaultValue={reserves.student}
                    variant="filled"
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
                      defaultValue={reserves.course}
                    >
                      <FormControlLabel
                        value="Vo"
                        control={<Radio />}
                        checked={course == "Vo"}
                        onChange={() => setCourse("Vo")}
                        label="Vo"
                      />
                      <FormControlLabel
                        value="Gt"
                        control={<Radio />}
                        label="Gt"
                        checked={course == "Gt"}
                        onChange={() => setCourse("Gt")}
                      />
                      <FormControlLabel
                        value="Ba"
                        control={<Radio />}
                        checked={course == "Ba"}
                        onChange={() => setCourse("Ba")}
                        label="Ba"
                      />
                      <FormControlLabel
                        value="DJ"
                        control={<Radio />}
                        checked={course == "DJ"}
                        onChange={() => setCourse("DJ")}
                        label="DJ"
                      />
                      <FormControlLabel
                        value="Uk"
                        control={<Radio />}
                        label="Uk"
                        checked={course == "Uk"}
                        onChange={() => setCourse("Uk")}
                      />
                      <FormControlLabel
                        value="Pf"
                        control={<Radio />}
                        label="Pf"
                        checked={course == "Pf"}
                        onChange={() => setCourse("Pf")}
                      />
                      <FormControlLabel
                        value="Vi"
                        control={<Radio />}
                        label="Vi"
                        checked={course == "Vi"}
                        onChange={() => setCourse("Vi")}
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
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Box>
        )}
      </React.Fragment>
    </>
  );
}
