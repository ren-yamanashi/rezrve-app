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
import { createMedia } from "@artsy/fresnel";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import Header from "../../templates/Header";
import { FreeList } from "../../../models/FreeList";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

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
    const u = user;
    setTest(u.email);
    if (!reserveDoc.exists()) {
      return;
    }
    const gotReserve = reserveDoc.data() as FreeList;
    gotReserve.id = reserveDoc.id;
    setReserves(gotReserve);
    console.log(reserves);
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
    try {
      await updateDoc(doc(db, "FreeSpace", id), {
        reserved: false,
        student: "",
        reserverUid: "",
      });
      toast.success("キャンセルしました", {
        position: "bottom-left",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
      return;
    }
  };
  /**==========
   * 予約更新
   *==========*/
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("a");
    const { db, reserveCollection } = getCollections();
    const reserveRef = doc(reserveCollection);
    try {
      await runTransaction(db, async (t: any) => {
        t.update(doc(reserveCollection, reserves.id), {
          student,
          course,
          reserved: true,
        });
      });
      setStudent("");
      setCourse("");
      toast.success("更新しました", {
        position: "bottom-left",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  }
  useEffect(() => {
    loadReserve();
  }, [query_.id]);
  return (
    <>
      <React.Fragment>
        <MediaContextProvider>
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
            <Media greaterThan="sm">
              <Typography sx={{ fontSize: 20 }} color="text.secondary">
                予約情報
              </Typography>
              <Box
                sx={{ flexGrow: 1, mt: 1 }}
                component="form"
                noValidate
                onSubmit={onSubmit}
              >
                {reserves && (
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
                          <Grid item xs={10} md={20}>
                            <Box
                              component="form"
                              noValidate
                              onSubmit={onSubmit}
                            >
                              <TextField
                                required
                                id="outlined"
                                name="studentName"
                                label="生徒名を変更"
                                inputProps={{ style: { fontSize: 20 } }}
                                fullWidth
                                defaultValue={reserves.student}
                                variant="filled"
                                onChange={(e) => setStudent(e.target.value)}
                              />
                            </Box>
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
                          <Grid item xs={10} md={20} textAlign="left">
                            <Typography variant="h5" component="div">
                              {reserves.teacher}
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
                              予約日
                            </Typography>
                          </Grid>
                          <Grid item xs={10} md={20} textAlign="left">
                            <Typography variant="h5" component="div">
                              {dayjs(reserves.date.toDate()).format(
                                "YYYY/MM/DD "
                              )}
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
                              予約時間
                            </Typography>
                          </Grid>
                          <Grid item xs={10} md={20} textAlign="left">
                            <Typography variant="h5" component="div">
                              {`${reserves.time}:30`}
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
                              予約受付日時
                            </Typography>
                          </Grid>
                          <Grid item xs={10} md={20} textAlign="left">
                            <Typography variant="h5" component="div">
                              {dayjs(reserves.createAt.toDate()).format(
                                "YYYY/MM/DD HH:mm"
                              )}
                            </Typography>
                          </Grid>
                        </Box>
                      </Item>
                    </Grid>
                  </Grid>
                )}
              </Box>
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
                <Grid item xs={20} md={3} lg={3}>
                  <Box mt={5} ml={5}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        maxWidth: 120,
                        mt: 3,
                        mb: 2,
                        bgcolor: "#ff6347",
                        "&:hover": { bgcolor: "red" },
                      }}
                      onClick={(e) => deleteRsv(reserves.id, e)}
                    >
                      キャンセル
                    </Button>
                  </Box>
                </Grid>
              </Box>
            </Media>
            {/* スマホレスポンシブ */}
            <Media at="sm">
              <Typography
                sx={{ fontSize: 20 }}
                color="text.secondary"
                gutterBottom
              >
                予約情報
              </Typography>
              <Box
                sx={{ flexGrow: 1, mt: 1 }}
                component="form"
                noValidate
                onSubmit={onSubmit}
              >
                {reserves && (
                  <Grid container spacing={2} margin="0 auto">
                    <Grid item xs={11} md={11} mt={4}>
                      <Item>
                        <Box display="flex">
                          <Grid item xs={10} md={11} my="auto">
                            <Typography
                              variant="h5"
                              component="div"
                              ml={5}
                              textAlign="left"
                              fontSize={12}
                            >
                              生徒名
                            </Typography>
                          </Grid>
                          <Grid item xs={10} md={20} textAlign="left">
                            <Box
                              component="form"
                              noValidate
                              onSubmit={onSubmit}
                            >
                              <TextField
                                required
                                id="outlined"
                                name="studentName"
                                label="生徒名を変更"
                                inputProps={{
                                  style: { fontSize: 13 },
                                }}
                                fullWidth
                                defaultValue={reserves.student}
                                variant="filled"
                                onChange={(e) => setStudent(e.target.value)}
                              />
                            </Box>
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
                              textAlign="left"
                              fontSize={12}
                            >
                              講師名
                            </Typography>
                          </Grid>
                          <Grid item xs={10} md={20} textAlign="left">
                            <Typography
                              variant="h6"
                              component="div"
                              fontSize={13}
                              color="black"
                            >
                              {reserves.teacher}
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
                              textAlign="left"
                              fontSize={12}
                            >
                              予約日
                            </Typography>
                          </Grid>
                          <Grid item xs={10} md={20} textAlign="left">
                            <Typography
                              variant="h6"
                              component="div"
                              fontSize={13}
                              color="black"
                            >
                              {dayjs(reserves.date.toDate()).format(
                                "YYYY/MM/DD "
                              )}
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
                              fontSize={12}
                              textAlign="left"
                            >
                              予約時間
                            </Typography>
                          </Grid>
                          <Grid item xs={10} md={20} textAlign="left">
                            <Typography
                              variant="h5"
                              component="div"
                              fontSize={13}
                              color="black"
                            >
                              {`${reserves.time}:30`}
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
                              fontSize={12}
                              textAlign="left"
                            >
                              受付日時
                            </Typography>
                          </Grid>
                          <Grid item xs={10} md={20} textAlign="left">
                            <Typography
                              variant="h5"
                              component="div"
                              fontSize={13}
                              color="black"
                            >
                              {dayjs(reserves.createAt.toDate()).format(
                                "YYYY/MM/DD HH:mm"
                              )}
                            </Typography>
                          </Grid>
                        </Box>
                      </Item>
                    </Grid>
                  </Grid>
                )}
              </Box>
              <Box display="flex">
                <Box width="10vw" ml={5}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, fontSize: 12 }}
                  >
                    更新
                  </Button>
                </Box>
                <Grid item xs={20} md={3} lg={3}>
                  <Box ml={5}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        maxWidth: 120,
                        fontSize: 12,
                        mt: 3,
                        mb: 2,
                        bgcolor: "#ff6347",
                        "&:hover": { bgcolor: "red" },
                      }}
                      onClick={(e) => deleteRsv(reserves.id, e)}
                    >
                      キャンセル
                    </Button>
                  </Box>
                </Grid>
              </Box>
            </Media>
            {/* スマホレスポンシブ */}
          </CardContent>
          {err == true && (
            <Grid xs={12} sm={15}>
              <Alert
                variant="filled"
                severity="error"
                sx={{ m: 3, textAlign: "center" }}
              >
                エラー : もう1度やり直してください
              </Alert>
            </Grid>
          )}
        </MediaContextProvider>
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
