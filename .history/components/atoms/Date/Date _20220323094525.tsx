import * as React from "react";
import Box from "@mui/material/Box";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import jaLocale from "date-fns/locale/ja";
import { TextField } from "@mui/material";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { format } from "date-fns";

class JaLocalizedUtils extends DateFnsUtils {
  // ヘッダ部分のテキストを取得するメソッド
  getDatePickerHeaderText(date: Date) {
    return format(date, "M月d日(E)", { locale: this.locale });
  }
}

const DateRangePicker = (props) => {
  return (
    <>
      <Box m={3} display="flex" alignItems="center">
        <MuiPickersUtilsProvider utils={JaLocalizedUtils} locale={jaLocale}>
          <DatePicker
            label="日付を選択"
            format="yyyy年/M月/d日"
            value={props.value}
            onChange={props.changeDate}
          />
        </MuiPickersUtilsProvider>
      </Box>
    </>
  );
};
export default DateRangePicker;
