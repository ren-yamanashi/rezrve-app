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
const PrimaryBtn = (props) => {
  const [value, setValue] = React.useState<Date | null>(new Date());
  return (
    <>
      <Box m={3} display="flex" alignItems="center">
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
          <DatePicker
            label="日付を選択"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
              const day = new Date(newValue);
              const y = day.getFullYear();
              const m = day.getMonth();
              const d = day.getDate();
              let date = new Date(y, m, d, 12, 0, 0);
              props.changeDate;
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
    </>
  );
};
export default PrimaryBtn;
