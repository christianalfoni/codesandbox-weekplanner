import { Action, AsyncAction } from "overmind";
import { CurrentSelection } from "./state";
import { getCurrentWeekDayId } from "../utils";

export const changeDescription: Action<string> = ({ state }, description) => {
  if (!state.backlogItem.matches("ADDING")) {
    state.backlogItem.description = description;
  }

  if (description) {
    state.backlogItem.transition("VALID");
  } else {
    state.backlogItem.transition("INVALID");
  }
};

export const toggleActiveWeekday: Action<number> = ({ state }, weekday) => {
  if (
    state.backlogItem.matches("ERROR") ||
    state.backlogItem.matches("INVALID") ||
    state.backlogItem.matches("VALID")
  ) {
    const activeWeekdays = state.backlogItem.activeWeekdays;
    if (activeWeekdays.includes(weekday)) {
      activeWeekdays.splice(activeWeekdays.indexOf(weekday), 1);
    } else {
      activeWeekdays.push(weekday);
    }
  }
};

export const setDate: Action<number> = ({ state }, date) => {
  if (
    state.backlogItem.matches("ERROR") ||
    state.backlogItem.matches("INVALID") ||
    state.backlogItem.matches("VALID")
  ) {
    state.backlogItem.date = date;
  }
};

export const setSelection: Action<CurrentSelection> = (
  { state },
  selection
) => {
  if (
    state.backlogItem.matches("ERROR") ||
    state.backlogItem.matches("INVALID") ||
    state.backlogItem.matches("VALID")
  ) {
    state.backlogItem.currentSelection = selection;
  }
};

export const addBacklogItem: AsyncAction = async ({
  state,
  effects,
  actions
}) => {
  const backlogItemState = state.backlogItem;
  if (
    state.matches("ADD_BACKLOG_ITEM") &&
    state.auth.matches("AUTHENTICATED") &&
    (backlogItemState.matches("VALID") || backlogItemState.matches("ERROR"))
  ) {
    const profile = state.auth.profile;
    const currentDescription = backlogItemState.description;

    const addingState = backlogItemState.transition("ADDING");
    if (addingState) {
      addingState.description = "";

      try {
        const doc = effects.api.createBacklogItem(profile);
        await effects.api.addBacklogItem(doc, {
          description: addingState.description,
          ...(addingState.currentSelection === CurrentSelection.DATE
            ? {
                date: backlogItemState.date
              }
            : {})
        });
        await Promise.all(
          addingState.activeWeekdays.map((weekDay) =>
            effects.api.setBacklogItemOnWeekDay(
              profile,
              getCurrentWeekDayId(weekDay),
              doc.id
            )
          )
        );

        const invalidState = addingState.transition("INVALID");
        if (invalidState) {
          invalidState.activeWeekdays = [];
          invalidState.currentSelection = CurrentSelection.NO_DUE_DATE;

          actions.showNotification("Backlog item added!");
          state.transition("HOME");
        }
      } catch (error) {
        console.log(error.message);
        const errorState = addingState.transition("ERROR");
        if (errorState) {
          errorState.description = currentDescription;
          errorState.error = error.message;
        }
      }
    }
  }
};
