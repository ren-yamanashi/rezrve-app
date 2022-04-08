import * as React from "react";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import { teal } from "@mui/material/colors";

interface ErrorProps {
  children?: React.ReactNode;
}

export default function Success(props: ErrorProps) {
  return (
    <Grid xs={12} sm={15}>
      <Alert
        variant="filled"
        severity="success"
        sx={{ m: 3, textAlign: "center", maxWidth: 300, bgcolor: teal[300] }}
      >
        {props.children}
      </Alert>
    </Grid>
  );
}
