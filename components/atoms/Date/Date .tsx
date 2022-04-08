import * as React from "react";
import Box from "@mui/material/Box";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import jaLocale from "date-fns/locale/ja";
import { TextField } from "@mui/material";
import { useDate } from "../../../hooks/date/useDate";
import "moment/locale/ja"; // 日本語ローカライズ
const DateRangePicker = (props) => {
  const { newDateTime, changeDateValue, dateValue } = useDate();
  return (
    <>
      <Box m={3} display="flex" alignItems="center">
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={jaLocale}>
          <DatePicker
            label="日付を選択"
            inputFormat="yyyy年M月d日"
            value={dateValue}
            onChange={props.changeDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
    </>
  );
};
export default DateRangePicker;
