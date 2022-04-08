import * as React from "react";
import Box from "@mui/material/Box";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { format } from "date-fns";
import "moment/locale/ja"; // 日本語ローカライズ
class JaLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date: Date) {
    return format(date, "yyyy年M月", { locale: this.locale });
  }
  getDatePickerHeaderText(date: Date) {
    return format(date, "M月d日(E)", { locale: this.locale });
  }
}
const MobileDateRangePicker = (props) => {
  return (
    <>
      <Box m={3} display="flex" alignItems="center">
        <MuiPickersUtilsProvider utils={JaLocalizedUtils}>
          <DatePicker
            label="日付を選択"
            value={props.value}
            onChange={props.changeDate}
            format="yyyy年M月d日"
          />
        </MuiPickersUtilsProvider>
      </Box>
    </>
  );
};
export default MobileDateRangePicker;
