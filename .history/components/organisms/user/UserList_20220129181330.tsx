import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
  getDocs,
  startAt,
  endAt,
  Timestamp,
  deleteDoc,
  doc,
  getDoc,
  limit,
  QuerySnapshot,
  DocumentData,
  startAfter,
} from "firebase/firestore";
import { browser } from "process";
import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { Users } from "../../../models/Users";
import Title from "../../atoms/Title";
import { Button } from "@mui/material";

export default function UsersList() {
  const [users, setUsers] = useState<Users[]>([]);
  const { user } = useAuth();
  const [isPaginationFinished, setIsPaginationFinished] = useState(false);
  const scrollContainerRef = useRef(null);
  users.map((u) => {
    console.log(u.url);
  });
  /**========
   * Firebaseからユーザーを取得
   *========*/
  //ベースクエリを作成
  function createBaseQuery() {
    const db = getFirestore();
    return query(collection(db, "users"), limit(10));
  }
  function appendUsers(snapshot: QuerySnapshot<DocumentData>) {
    const gotUsers = snapshot.docs.map((doc) => {
      const user = doc.data() as Users;
      user.id = doc.id;
      return user;
    });
    setUsers(users.concat(gotUsers));
  }
  async function loadUsers() {
    const snapshot = await getDocs(createBaseQuery());
    if (snapshot.empty) {
      setIsPaginationFinished(true);
      return;
    }
    appendUsers(snapshot);
  }
  async function loadNextUsers() {
    if (users.length === 0) {
      return;
    }
    const lastChat = users[users.length - 1];
    const snapshot = await getDocs(query(createBaseQuery()));
    if (snapshot.empty) {
      return;
    }
    appendUsers(snapshot);
  }
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    loadUsers();
  }, [process.browser, user]);
  /**==========
   * スクロール処理
   *=========*/
  function onScroll() {
    if (isPaginationFinished) {
      return;
    }
    const container = scrollContainerRef.current;
    if (container === null) {
      return;
    }
    const rect = container.getBoundingClientRect();
    if (rect.top + rect.height > window.innerHeight) {
      return;
    }
    loadNextUsers();
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [users, scrollContainerRef.current, isPaginationFinished]);
  // useEffect(() => {
  //   if (!process.browser) {
  //     return;
  //   }
  //   if (user === null) {
  //     return;
  //   }
  //   async function loadUser() {
  //     const db = getFirestore();
  //     const q = query(collection(db, "users"));
  //     const snapshot = await getDocs(q);
  //     if (snapshot.empty) {
  //       return;
  //     }
  //     //users一覧の展開
  //     const gotUsers = snapshot.docs.map((doc) => {
  //       const user = doc.data() as Users;
  //       user.id = doc.id;
  //       return user;
  //     });
  //     setUsers(gotUsers);
  //   }
  //   loadUser();
  // }, [process, browser, user]);
  /**==============
   * ユーザー削除
   *=============*/
  const deleteUser = async (id: string, e: any) => {
    const db = getFirestore();
    const q = query(collection(db, "users"));
    e.stopPropagation();
    await deleteDoc(doc(db, "users", id));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return;
    }
    const gotUsers = snapshot.docs.map((doc) => {
      const user = doc.data() as Users;
      user.id = doc.id;
      return user;
    });
    setUsers(gotUsers);
  };
  return (
    <>
      <React.Fragment>
        <Box ml={3}>
          <Title>講師一覧</Title>
        </Box>
        <Box>
          <div className="col-12 col-md-6" ref={scrollContainerRef}>
            {users.map((rsv) => (
              <>
                <Box mb={3}>
                  <CardContent
                    style={{
                      width: "80%",
                      borderRadius: "7px",
                      borderStyle: "solid",
                      borderWidth: "2px",
                      borderColor: "#4689FF",
                      margin: "auto",
                    }}
                  >
                    <Box display="flex">
                      <CardMedia
                        component="img"
                        sx={{
                          borderRadius: "50%",
                          height: 60,
                          width: 60,
                          ml: 1,
                        }}
                        image={rsv.url}
                        alt="Icon"
                      />
                      <Typography sx={{ fontSize: 15, my: "auto", mx: 1 }}>
                        {rsv.userName}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: 20, mt: 2, ml: 2 }}>
                      {rsv.email}
                    </Typography>
                  </CardContent>
                </Box>
              </>
            ))}
          </div>
        </Box>
      </React.Fragment>
    </>
  );
}
