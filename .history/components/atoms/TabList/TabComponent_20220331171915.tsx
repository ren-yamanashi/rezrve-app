import * as React from "react";
import Typography from "@mui/material/Typography";

interface TabProps {
  children?: React.ReactNode;
}
//タイトルコンポーネントを作成して、中身をpropsとして渡す。
export default function TabComponent(props: TabProps) {
  return (
    <>
      <Tab
        sx={{
          borderStyle: "solid",
          fontSize: 20,
          display: "flex",
          flexDirection: "column",
        }}
      ></Tab>
    </>
  );
}
