import * as React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const SelectComponent = (props) => {
  return (
    <>
      <MenuItem>
        <Button onClick={() => router.push(`/user/profile/${user?.uid}`)}>
          アカウントを編集
        </Button>
      </MenuItem>
    </>
  );
};
