import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState, useEffect, FormEvent } from "react";
//内部インポート
import { User } from "../../../models/User";
import YoyakuListToday from "../../../components/organisms/manager/YoyakuListToday";
import Header from "../../../components/templates/HeaderNext";
import HeaderAtMd from "../../../components/templates/Header";
import RsvPage from "../../../components/organisms/manager/RsvPage";
import { Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Title from "../../../components/atoms/Title";
import { createMedia } from "@artsy/fresnel";
import React, { Component } from "react";
import { View, Alert, Button } from "react-native";
import Mailer from "react-native-mail";
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

  const handleEmail = () => {
    Mailer.mail(
      {
        subject: "need help",
        recipients: ["pinokionigg@icloud.com"],
        ccRecipients: ["pinokionigg@icloud.com"],
        bccRecipients: ["pinokionigg@icloud.com"],
        body: "<b>A Bold Body</b>",
        customChooserTitle: "This is my new title", // Android only (defaults to "Send Mail")
        isHTML: true,
        attachments: [
          {
            // Specify either `path` or `uri` to indicate where to find the file data.
            // The API used to create or locate the file will usually indicate which it returns.
            // An absolute path will look like: /cacheDir/photos/some image.jpg
            // A URI starts with a protocol and looks like: content://appname/cacheDir/photos/some%20image.jpg
            path: "", // The absolute path of the file from which to read data.
            uri: "", // The uri of the file from which to read the data.
            // Specify either `type` or `mimeType` to indicate the type of data.
            type: "", // Mime Type: jpg, png, doc, ppt, html, pdf, csv
            mimeType: "", // - use only if you want to use custom type
            name: "", // Optional: Custom filename for attachment
          },
        ],
      },
      (error, event) => {
        Alert.alert(
          error,
          event,
          [
            {
              text: "Ok",
              onPress: () => console.log("OK: Email Error Response"),
            },
            {
              text: "Cancel",
              onPress: () => console.log("CANCEL: Email Error Response"),
            },
          ],
          { cancelable: true }
        );
      }
    );
  };

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
          <View>
            <Button
              onPress={this.handleEmail}
              title="Email Me"
              color="#841584"
              accessabilityLabel="Purple Email Me Button"
            />
          </View>
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
