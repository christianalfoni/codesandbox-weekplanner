import * as React from "react";
import { styled } from "../css";

function getFormattedDate(date: Date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const CalendarElement = styled.input({
  width: "100%",
  marginTop: 2,
  marginBottom: 2
});

type Props = {
  disabled?: boolean;
  date: number;
  onChange: (date: number) => void;
};

export const Calendar: React.FC<Props> = ({ disabled, date, onChange }) => {
  return (
    <CalendarElement
      disabled={disabled}
      type="date"
      value={date ? getFormattedDate(new Date(date)) : undefined}
      onChange={(event) => {
        const dateInstance = new Date();
        const dateParts = event.target.value.split("-").map(Number);
        dateInstance.setFullYear(dateParts[0]);
        dateInstance.setMonth(dateParts[1] - 1);
        dateInstance.setDate(dateParts[2]);
        dateInstance.setHours(0);
        dateInstance.setMinutes(0);
        dateInstance.setSeconds(0);

        onChange(dateInstance.getTime());
      }}
    />
  );
};
