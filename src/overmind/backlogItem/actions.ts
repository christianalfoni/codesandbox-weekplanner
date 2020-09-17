import { Action, AsyncAction } from "overmind";
import { CurrentSelection } from "./state";
import { getCurrentWeekDayId } from "../utils";

export const changeDescription: Action<string> = ({ state }, description) => {
  if (!state.backlogItem.matches("ADDING")) {
    state.backlogItem.description = description;
  }

  if (description) {
    return state.backlogItem.transition("VALID", {});
  } else {
    return state.backlogItem.transition("INVALID", {});
  }
};

export const toggleActiveWeekday: Action<number> = ({ state }, weekday) => {
  if (state.backlogItem.matches("ERROR", "INVALID", "VALID")) {
    const activeWeekdays = state.backlogItem.activeWeekdays;
    if (activeWeekdays.includes(weekday)) {
      activeWeekdays.splice(activeWeekdays.indexOf(weekday), 1);
    } else {
      activeWeekdays.push(weekday);
    }
  }
};

export const setDate: Action<number> = ({ state }, date) => {
  if (state.backlogItem.matches("ERROR", "INVALID", "VALID")) {
    state.backlogItem.date = date;
  }
};

export const setSelection: Action<CurrentSelection> = (
  { state },
  selection
) => {
  if (state.backlogItem.matches("ERROR", "INVALID", "VALID")) {
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
    backlogItemState.matches("VALID", "ERROR")
  ) {
    const profile = state.auth.profile;
    const currentDescription = state.backlogItem.description;

    return state.backlogItem.transition("ADDING", {}, async (addingState) => {
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

        addingState.description = "";

        return addingState.transition(
          "INVALID",
          {
            activeWeekdays: [],
            currentSelection: CurrentSelection.NO_DUE_DATE
          },
          () => {
            actions.showNotification("Backlog item added!");
            return state.transition("HOME", {});
          }
        );
      } catch (error) {
        return addingState.transition("ERROR", {
          error: error.message,
          description: currentDescription
        });
      }
    });
  }
};
