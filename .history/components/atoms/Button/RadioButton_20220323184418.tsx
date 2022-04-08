import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

const RadioButton = (props) => {
  const timeArray = [10, 11, 12, 13, 14, 15, 16, 17, 18];
  return (
    <Box sx={{ mt: 1 }}>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          {timeArray.map((time) => (
            <FormControlLabel
              key={time}
              control={<Radio />}
              label={`${timeArray.map((time) => time)}`}
              checked={time == time}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
