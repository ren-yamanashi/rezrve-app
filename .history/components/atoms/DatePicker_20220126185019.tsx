import React, { useState } from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";

import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

const MyDateRangePicker: React.FC = () => {
  const [date, setDate] = useState<moment.Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<boolean>(false);
  console.log(date);

  return (
    <>
      <SingleDatePicker
        id="hizuk"
        focused={focusedInput}
        date={date}
        onDateChange={(date) => setDate(date)}
        onFocusChange={(focusedInput) => setFocusedInput(true)}
        onClose={(focused) => setFocusedInput(false)}
      />
    </>
  );
};

export default MyDateRangePicker;
