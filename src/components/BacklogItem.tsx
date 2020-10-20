import * as React from "react";
import { useAppState, useActions } from "../hooks";
import { styled } from "../css";
import {
  stringToColor,
  getWeekDayIndexes,
  getCurrentWeekDayId
} from "../overmind/utils";
import { WeekdayPicker } from "../ui-components/WeekdayPicker";
import { Avatar } from "../ui-components/Avatar";
const Card = styled.div({
  marginTop: "$3",
  marginBottom: "$3",
  borderBottomStyle: "solid",
  borderBottomSize: 1,
  borderBottomColor: "gray"
});

const Description = styled.div({
  marginBottom: "$2"
});

const WeekdayPickerContainer = styled.div({
  display: "flex",
  width: "100%",
  marginBottom: "$3"
});

const Weekdays = styled.div({
  display: "flex",
  width: "100%",
  justifyContent: "space-around"
});

export const BacklogItem: React.FC<{
  id: string;
  previousWeekDates: string[];
  currentWeekDates: string[];
}> = React.memo(({ id, previousWeekDates, currentWeekDates }) => {
  const state = useAppState();
  const actions = useActions();

  if (state.current === "AUTHENTICATED") {
    const backlogItem = state.app.backlog[id];
    const daysByProfileUid = state.app.days[backlogItem.id] || {};

    return (
      <Card>
        <Description> {backlogItem.description}</Description>
        {Object.keys(state.profiles).map((uid) => {
          const activeWeekDays = getWeekDayIndexes(
            daysByProfileUid[uid] || [],
            currentWeekDates
          );
          const previouslyActiveWeekDays = getWeekDayIndexes(
            daysByProfileUid[uid] || [],
            previousWeekDates
          );
          const name = state.profiles[uid];
          const color = stringToColor(uid);

          return (
            <WeekdayPickerContainer key={uid}>
              <Avatar color={color} name={name} />
              <Weekdays>
                <WeekdayPicker
                  activeWeekdays={activeWeekDays}
                  previouslyActiveWeekDays={previouslyActiveWeekDays}
                  onChange={(dayIndex) => {
                    actions.toggleBacklogItemWeekDay({
                      date: getCurrentWeekDayId(dayIndex),
                      backlogItemId: id
                    });
                  }}
                  color={color}
                />
              </Weekdays>
            </WeekdayPickerContainer>
          );
        })}
      </Card>
    );
  }

  return null;
});
