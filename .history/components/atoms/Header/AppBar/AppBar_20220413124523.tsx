import * as React from "react";
import AppBar from "@mui/material/AppBar";
interface AppBarProps {
  children?: React.ReactNode;
}
const drawerWidth = 210;

const AppBarComponent = (props: AppBarProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: "#FFFFFE",
      }}
    >
      {props.children}
    </AppBar>
  );
};

export default AppBarComponent;
