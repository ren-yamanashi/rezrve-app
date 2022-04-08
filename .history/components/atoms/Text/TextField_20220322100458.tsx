import * as React from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
const FieldTx = (props) => {
  return (
    <>
      <TextField
        margin="normal"
        id="studentName"
        sx={{ mb: 3 }}
        label="生徒名を入力"
        fullWidth
        autoComplete="studentName"
        onChange={(e) => setStudent(e.target.value)}
      />
    </>
  );
};
export default FieldTx;
