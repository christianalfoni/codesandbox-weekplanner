import { Action, AsyncAction } from "overmind";
import { BacklogItems, Days, DaysByBacklogItem } from "./state";

export const openScreen: Action<
  "HOME" | "ADD_BACKLOG_ITEM" | "EDIT_CURRENT_WEEK"
> = ({ state }, screen) => {
  state.transition(screen);
};

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
    state.matches("HOME") ||
    state.matches("ADD_BACKLOG_ITEM") ||
    state.matches("EDIT_CURRENT_WEEK") ||
    state.matches("PLAN_NEXT_WEEK")
  ) {
    Object.assign(state.backlog, backlogItems);
  }
};

export const onWeekDaysUpdate: Action<DaysByBacklogItem> = (
  { state },
  days
) => {
  if (
    state.matches("HOME") ||
    state.matches("ADD_BACKLOG_ITEM") ||
    state.matches("EDIT_CURRENT_WEEK") ||
    state.matches("PLAN_NEXT_WEEK")
  ) {
    Object.assign(state.days, days);
  }
};
