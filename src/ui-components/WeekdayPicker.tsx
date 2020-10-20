import * as React from "react";
import { styled } from "../css";
import {
  DEFAULT_WEEKDAY_MAPPING,
  WEEKDAY_NAMES_SHORT
} from "../overmind/constants";

type Props = {
  disabled?: boolean;
  activeWeekdays: number[];
  previouslyActiveWeekDays?: number[];
  weekdayMapping?: [number, number, number, number, number, number, number];
  onChange: (weekdayIndex: number) => void;
  color: string;
};

const WeekdayButton = styled.button({
  borderStyle: "solid",
  borderSize: "thin",
  borderRadius: "$2",
  padding: ["$1", "$2", "$1"]
});

export const WeekdayPicker: React.FC<Props> = ({
  disabled,
  activeWeekdays,
  previouslyActiveWeekDays = [],
  weekdayMapping = DEFAULT_WEEKDAY_MAPPING,
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
          {WEEKDAY_NAMES_SHORT[weekdayIndex]}
        </WeekdayButton>
      ))}
    </React.Fragment>
  );
};
