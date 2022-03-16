import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState, useEffect, FormEvent } from "react";
//内部インポート
import { User } from "../../../models/User";
import YoyakuListToday from "../../../components/organisms/manager/YoyakuListToday";
import Header from "../../../components/templates/HeaderNext";
import HeaderAtMd from "../../../components/templates/Header";
import RsvPage from "../../../components/organisms/manager/RsvPage";
import { Box, Button } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Title from "../../../components/atoms/Title";
import { createMedia } from "@artsy/fresnel";
import onclickSendMail from "../../../hooks/sendEmail";
import { init } from "@emailjs/browser";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
type Query = {
  uid: string;
};
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

export default function HomePage() {
  const form = useRef();
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const query = router.query as Query;
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.GATSBY_EMAILJS_SERVICE_ID,
        process.env.GATSBY_EMAILJS_TEMPLATE_ID,
        form.current,
        "u9Bi2r0fI-UvbZzmX"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

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
      <MediaContextProvider>
        <Media greaterThan="md">
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
              <>
                <form ref={form} onSubmit={sendEmail}>
                  <label>Name</label>
                  <input type="text" name="user_name" />
                  <label>Email</label>
                  <input type="email" name="user_email" />
                  <label>Message</label>
                  <textarea name="message" />
                  <input type="submit" value="Send" />
                </form>
              </>
            </Box>
          </Header>
        </Media>
        <Media at="md">
          <HeaderAtMd />
          <Box>
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
        </Media>
        <Media at="sm">
          <Box mt={5} ml={2} mr={2} display="flex">
            <Title>管理者ページは、 スマートフォンでの閲覧はできません</Title>
          </Box>
        </Media>
      </MediaContextProvider>
    </>
  );
}
