import React, { useState } from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import { atom, useRecoilState } from "recoil";

import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

export const dateState = atom({
  key: "date",
  default: null,
});

const MyDateRangePicker: React.FC = () => {
  const [date, setDate] = useRecoilState(dateState);
  const [focusedInput, setFocusedInput] = useState<boolean>(false);
  console.log(date);

  return (
    <>
      <SingleDatePicker
        id="date"
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
