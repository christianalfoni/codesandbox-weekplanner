import { Action, AsyncAction } from "overmind";
import { BacklogItems } from "./state";

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

export const openScreen: Action<"HOME" | "ADD_BACKLOG_ITEM"> = (
  { state },
  screen
) => {
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
