import * as React from "react";
import { Slider } from "../ui-components/Slider";
import { DEFAULT_WEEKDAY_MAPPING, WEEKDAY_NAMES } from "../overmind/constants";
import { styled } from "../css";
import { useAppState } from "../hooks";
import { getCurrentWeekDayId } from "../overmind/utils";
import { Avatar } from "../ui-components/Avatar";

const WeekdayTitle = styled.h2({
  fontWeight: 900
});

const DayItem = styled.div({
  display: "flex",
  alignItems: "center",
  marginBottom: "$2",
  "> :first-child": {
    marginRight: "$2"
  }
});

export const CurrentWeek = () => {
  const state = useAppState();
  const initialSlideIndex = DEFAULT_WEEKDAY_MAPPING.indexOf(
    new Date().getDay()
  );

  if (state.current !== "AUTHENTICATED") return null;

  return (
    <Slider initialSlideIndex={initialSlideIndex}>
      {DEFAULT_WEEKDAY_MAPPING.map((weekdayIndex) => {
        const dayId = getCurrentWeekDayId(weekdayIndex);

        return (
          <Slider.Slide key={weekdayIndex}>
            <WeekdayTitle>{WEEKDAY_NAMES[weekdayIndex]}</WeekdayTitle>
            {(state.app.backlogItemsByDay[dayId] || []).map((item, index) => {
              const profileName = state.profiles[item.profileUid];

              return (
                <DayItem key={index}>
                  <Avatar>{profileName}</Avatar>
                  {state.app.backlog[item.backlogItemId].description}
                </DayItem>
              );
            })}
          </Slider.Slide>
        );
      })}
    </Slider>
  );
};
