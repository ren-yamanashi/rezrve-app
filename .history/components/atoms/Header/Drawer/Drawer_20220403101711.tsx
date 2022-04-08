import * as React from "react";

import Drawer from "@mui/material/Drawer";
interface DrawerProps {
  children?: React.ReactNode;
}
const drawerWidth = 210;

export default function DrawerComponent(props: DrawerProps) {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "#0288d1",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {props.children}
    </Drawer>
  );
}
