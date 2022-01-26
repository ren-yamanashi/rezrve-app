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
        <Card sx={{ minWidth: 275, marginTop: "10vh" }}>
          <CardContent
            style={{
              width: "70%",
              borderRadius: "20px",
              borderStyle: "solid",
              borderColor: "teal",
              margin: "auto",
            }}
          >
            <Typography
              sx={{ fontSize: 30 }}
              color="text.secondary"
              gutterBottom
            >
              予約情報
            </Typography>
            {reserves && (
              <Box
                component="form"
                noValidate
                onSubmit={onSubmit}
                sx={{ mt: 1 }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={8} mt={4}>
                      <Item>
                        <Box display="flex">
                          <Typography
                            variant="h5"
                            component="div"
                            mx={5}
                            color="black"
                            width="20%"
                            textAlign="left"
                          >
                            予約者名
                          </Typography>
                          <Box width={300}>
                            <TextField
                              required
                              id="outlined"
                              name="studentName"
                              inputProps={{ style: { fontSize: 25 } }}
                              fullWidth
                              defaultValue={reserves.student}
                              variant="filled"
                              onChange={(e) => setStudent(e.target.value)}
                            />
                          </Box>
                        </Box>
                      </Item>
                    </Grid>
                    <Grid item xs={6} md={8}>
                      <Item2>
                        <Box display="flex">
                          <Typography
                            variant="h5"
                            component="div"
                            mx={5}
                            color="black"
                            width="20%"
                            textAlign="left"
                          >
                            担当者名
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
                            mx={5}
                            color="black"
                            width="20%"
                            textAlign="left"
                          >
                            コース
                          </Typography>
                          <Typography variant="h5" component="div">
                            {reserves.course}
                          </Typography>
                          <Box sx={{ mt: 1 }} width="30vw">
                            <FormControl>
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
                        </Box>
                      </Item>
                    </Grid>
                    <Grid item xs={6} md={8}>
                      <Item2>
                        <Box display="flex">
                          <Typography
                            variant="h5"
                            component="div"
                            mx={5}
                            color="black"
                            width="20%"
                            textAlign="left"
                          >
                            予約日
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
                            mx={5}
                            color="black"
                            width="20%"
                            textAlign="left"
                          >
                            予約時間
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
                            mx={5}
                            color="black"
                            width="20%"
                            textAlign="left"
                          >
                            予約受付日時
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
                  <Box display="flex">
                    <Box width="10vw" mt={5} ml={5}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        更新
                      </Button>
                    </Box>
                    <Box width="10vw" mt={5} ml={5}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, bgcolor: "#ff6347" }}
                      >
                        予約をキャンセル
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </React.Fragment>
    </>
  );
}
