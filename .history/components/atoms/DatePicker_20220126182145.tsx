import React, { useState } from "react";
import moment from "moment";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker } from "react-dates";

const MyDateRangePicker = () => {
  const [date, setDate] = useState(moment);
  const [focused, setFocused] = useState();
  return (
    <div>
      <SingleDatePicker
        date={date}
        onDateChange={(date) => setDate(date)}
        focused={focused}
        onFocusChange={(focused) => setFocused(focused)}
        id="date"
        displayFormat="YYYY-MM-DD"
        onClose={(focused) => setFocused(false)}
      />
    </div>
  );
};
export default MyDateRangePicker;
