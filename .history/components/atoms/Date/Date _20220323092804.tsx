import * as React from "react";
import Box from "@mui/material/Box";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { ja } from "date-fns/locale";
import { TextField } from "@mui/material";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
const DateRangePicker = (props) => {
  return (
    <>
      <Box m={3} display="flex" alignItems="center">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="日付を選択"
            value={props.value}
            onChange={props.changeDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
    </>
  );
};
export default DateRangePicker;
