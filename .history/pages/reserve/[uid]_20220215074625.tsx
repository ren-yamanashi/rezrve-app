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
import Header from "../../components/templates/HeaderNext";
import { useAuth } from "../../hooks/useUserAuth";
import ReservesAll from "../../components/organisms/ReservesAll";
import { Box } from "@mui/material";
import SelectDay from "../../components/organisms/calender/selectday";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { teal } from "@mui/material/colors";
type Query = {
  uid: string;
};

export default function ReservePage() {
  const [user2, setUser] = useState<User>();
  const router = useRouter();
  const { user } = useAuth();
  const query = router.query as Query;
  const [open, setOpen] = useState(false);

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
          <CardContent
            style={{
              width: "95%",
              borderRadius: "7px",
              borderStyle: "solid",
              borderWidth: "2px",
              borderColor: "#4689FF",
              margin: "auto",
            }}
          >
            <Reserve />
          </CardContent>
          <Box mt={5} textAlign="center">
            <Button
              onClick={() => setOpen(!open)}
              sx={{
                bgcolor: teal[400],
                color: "white",
                "&:hover": { bgcolor: teal[500] },
              }}
            >
              {open == true ? "閉じる" : "レッスンスケジュールを開く"}
            </Button>
          </Box>
          {open == true && (
            <Box mt={1}>
              <CardContent
                style={{
                  width: "95%",
                  borderRadius: "7px",
                  borderStyle: "solid",
                  borderWidth: "2px",
                  borderColor: "#4689FF",
                  margin: "auto",
                }}
              >
                <SelectDay />
              </CardContent>
            </Box>
          )}
        </Box>
      </Header>
    </>
  );
}
