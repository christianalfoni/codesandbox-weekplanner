import { Action, AsyncAction } from "overmind";
import { BacklogItems, DaysByBacklogItem } from "./state";

export const openScreen: Action<
  "HOME" | "ADD_BACKLOG_ITEM" | "EDIT_CURRENT_WEEK"
> = ({ state }, screen) => state.transition(screen, {});

export const showNotification: AsyncAction<string> = async (
  { state },
  text
) => {
  state.notification = text;
  await new Promise((resolve) => setTimeout(resolve, 1500));
  state.notification = null;
};

export const onBacklogUpdate: Action<BacklogItems> = (
  { state },
  backlogItems
) => {
  if (
    state.matches(
      "HOME",
      "ADD_BACKLOG_ITEM",
      "EDIT_CURRENT_WEEK",
      "PLAN_NEXT_WEEK"
    )
  ) {
    Object.assign(state.backlog, backlogItems);
  }
};

export const onWeekDaysUpdate: Action<DaysByBacklogItem> = (
  { state },
  days
) => {
  if (
    state.matches(
      "HOME",
      "ADD_BACKLOG_ITEM",
      "EDIT_CURRENT_WEEK",
      "PLAN_NEXT_WEEK"
    )
  ) {
    Object.assign(state.days, days);
  }
};

export const toggleBacklogItemWeekDay: Action<{
  date: string;
  backlogItemId: string;
}> = ({ state, effects }, { date, backlogItemId }) => {
  if (state.auth.matches("AUTHENTICATED")) {
    const profile = state.auth.profile;

    effects.api.setBacklogItemOnWeekDay(profile, date, backlogItemId);
  }
};
