import * as React from "react";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";

interface ErrorProps {
  children?: React.ReactNode;
}

export default function AlertComponent(props: ErrorProps) {
  return (
    <Grid xs={12} sm={15}>
      <Alert
        variant="filled"
        severity="error"
        sx={{ m: 3, textAlign: "left", maxWidth: 300 }}
      >
        {props.children}
      </Alert>
    </Grid>
  );
}
