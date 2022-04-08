import * as React from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useUserAuth";

interface CardProps {
  children?: React.ReactNode;
}
//タイトルコンポーネントを作成して、中身をpropsとして渡す。
/**===========
 * @param props 画面遷移がある　予約一覧へ推移
 * @returns
 *=========*/
export default function ButtonComponent(props: CardProps) {
  const router = useRouter();
  const { user } = useAuth();
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: "#3CB371",
        "&:hover": { bgcolor: "#2E8B57" },
        fontSize: 13,
      }}
      onClick={() => router.push(`/reserve/${user.uid}`)}
    >
      {props.children}
    </Button>
  );
}
