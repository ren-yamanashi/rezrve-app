import * as React from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useAuth } from "../../../hooks/useUserAuth";
import { blue } from "@mui/material/colors";

interface ButtonProps {
  children?: React.ReactNode;
}

/**===========
 * @param props 画面遷移がある　予約一覧へ推移
 *=========*/
export default function ButtonComponent(props: ButtonProps) {
  const router = useRouter();
  const { user } = useAuth();
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: blue[400],
        "&:hover": { bgcolor: blue[300] },
        fontSize: 13,
      }}
      onClick={() => router.push(`/reserve/${user.uid}`)}
    >
      {props.children}
    </Button>
  );
}
