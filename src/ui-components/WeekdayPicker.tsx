import * as React from "react";
import { styled } from "../css";

type Props = {
  disabled?: boolean;
  activeWeekdays: number[];
  weekdayMapping?: [number, number, number, number, number, number, number];
  onChange: (weekdayIndex: number) => void;
};

const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const WeekdayButton = styled.button(
  {
    border: ["thin", "solid", "main"],
    borderRadius: 2,
    padding: [1, 2, 1]
  },
  {
    variant: {
      active: {
        backgroundColor: "main"
      }
    }
  }
);

export const WeekdayPicker: React.FC<Props> = ({
  disabled,
  activeWeekdays,
  weekdayMapping = [1, 2, 3, 4, 5, 6, 0],
  onChange
}) => {
  const currentDayIndex = new Date().getDay();

  return (
    <React.Fragment>
      {weekdayMapping.map((weekdayIndex, index) => (
        <WeekdayButton
          key={index}
          onClick={() => onChange(weekdayIndex)}
          disabled={disabled || index < weekdayMapping.indexOf(currentDayIndex)}
          variant={activeWeekdays.includes(weekdayIndex) && "active"}
        >
          {weekdays[weekdayIndex]}
        </WeekdayButton>
      ))}
    </React.Fragment>
  );
};
