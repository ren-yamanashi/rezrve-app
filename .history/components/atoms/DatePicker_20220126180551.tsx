import React, { FC, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import moment from "moment";
import { DateRangePicker } from "react-dates";
import "moment/locale/ja";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

const MyDateRangePicker: FC = () => {
  const [day, setDay] = React.useState(new Date());
  let y = day.getFullYear();
  let m = 1 + day.getMonth();
  let d = day.getDate();
  let date = `${y}/${m}/${d}`;
  console.log(date);
  return (
    <Box width="10vw">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <DesktopDatePicker
            label="For desktop"
            value={day}
            minDate={new Date("2017-01-01")}
            onChange={(newValue) => {
              setDay(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    </Box>
  );
};
