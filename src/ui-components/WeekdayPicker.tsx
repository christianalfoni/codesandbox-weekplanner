import * as React from "react";
import { styled } from "../css";

type Props = {
  disabled?: boolean;
  activeWeekdays: number[];
  previouslyActiveWeekDays?: number[];
  weekdayMapping?: [number, number, number, number, number, number, number];
  onChange: (weekdayIndex: number) => void;
  color: string;
};

const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const WeekdayButton = styled.button({
  borderStyle: "solid",
  borderSize: "thin",
  borderRadius: 2,
  padding: [1, 2, 1]
});

export const WeekdayPicker: React.FC<Props> = ({
  disabled,
  activeWeekdays,
  previouslyActiveWeekDays = [],
  weekdayMapping = [1, 2, 3, 4, 5, 6, 0],
  onChange,
  color
}) => {
  const currentDayIndex = new Date().getDay();

  return (
    <React.Fragment>
      {weekdayMapping.map((weekdayIndex, index) => (
        <WeekdayButton
          key={index}
          onClick={() => onChange(weekdayIndex)}
          disabled={disabled || index < weekdayMapping.indexOf(currentDayIndex)}
          style={
            activeWeekdays.includes(weekdayIndex)
              ? {
                  backgroundColor: color,
                  borderColor: color
                }
              : previouslyActiveWeekDays.includes(weekdayIndex)
              ? {
                  backgroundColor: "gray",
                  borderColor: color
                }
              : {
                  borderColor: color
                }
          }
        >
          {weekdays[weekdayIndex]}
        </WeekdayButton>
      ))}
    </React.Fragment>
  );
};
