import * as React from "react";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";

interface ErrorProps {
  children?: React.ReactNode;
}
/**===========
 * @param props info 青　PCレスポンス
 *=========*/
export default function ErrorInfoAtPC(props: ErrorProps) {
  return (
    <Grid xs={12} sm={15}>
      <Alert
        variant="filled"
        severity="info"
        sx={{ m: 3, textAlign: "center" }}
      >
        {props.children}
      </Alert>
    </Grid>
  );
}
