import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState, useEffect, FormEvent } from "react";
//内部インポート
import { User } from "../../../models/User";
import YoyakuListToday from "../../../components/organisms/manager/YoyakuListToday";
import Header from "../../../components/templates/HeaderNext";
import RsvPage from "../../../components/organisms/manager/RsvPage";
import { Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Title from "../../../components/atoms/Title";
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
      <Header>
        <Box m={10}>
          <YoyakuListToday />
          <Box mt={5}>
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
              <RsvPage />
            </CardContent>
          </Box>
        </Box>
      </Header>
    </>
  );
}
