import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import RadioGroup from "@mui/material/RadioGroup";
import * as React from "react";

interface RadioButtonProps {
  children?: React.ReactNode;
}

const RadioButton = (props: RadioButtonProps) => {
  return (
    <Box sx={{ mt: 1 }}>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          {props.children}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
export default RadioButton;
