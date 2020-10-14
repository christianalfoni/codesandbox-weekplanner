import { Action, AsyncAction } from "overmind";
import { BacklogItems, DaysByBacklogItem } from "../machines/app";

import { User } from "firebase";
import { CurrentSelection } from "../machines/addBacklogItem";
import { getCurrentWeekDayId } from "../utils";

export const onAuthChanged: AsyncAction<User | null> = async (
  { state, effects, actions },
  user
) => {
  if (user) {
    try {
      const profile = await effects.api.getProfile(user);

      if (
        state
          .send("AUTHENTICATED", {
            user,
            profile
          })
          .matches("AUTHENTICATED")
      ) {
        effects.api.streamBacklog(profile, actions.onBacklogUpdate);
        effects.api.streamWeekDays(profile, actions.onWeekDaysUpdate);
      }
    } catch (error) {
      if (
        state.send("UNAUTHENTICATED", error.message).matches("UNAUTHENTICATED")
      ) {
        effects.api.disposeStreamBacklog();
      }
    }
  } else if (effects.browser.isIframe()) {
    state.send("INVALID_ENV");
  } else {
    if (
      state.send("UNAUTHENTICATED", "Not logged in").matches("UNAUTHENTICATED")
    ) {
      effects.api.disposeStreamBacklog();
    }
  }
};

export const signIn: Action = ({ state, effects }) => {
  if (state.send("AUTHENTICATING").matches("AUTHENTICATING")) {
    effects.api.signIn();
  }
};

export const signOut: Action = ({ state, effects }) => {
  if (state.matches("AUTHENTICATED")) {
    effects.api.signOut();
  }
};

export const openHome: Action = ({ state }) => {
  state.matches("AUTHENTICATED")?.app.send("HOME_NAVIGATED");
};

export const openAddBacklogItem: Action = ({ state }) => {
  state.matches("AUTHENTICATED")?.app.send("ADD_BACKLOG_ITEM_NAVIGATED");
};

export const openEditCurrentWeek: Action = ({ state }) => {
  state.matches("AUTHENTICATED")?.app.send("EDIT_CURRENT_WEEK_NAVIGATED");
};

export const openEditNextWeek: Action = ({ state }) => {
  state.matches("AUTHENTICATED")?.app.send("EDIT_NEXT_WEEK_NAVIGATED");
};

export const showNotification: AsyncAction<string> = async (
  { state },
  text
) => {
  if (
    state
      .matches("AUTHENTICATED")
      ?.app.notification.send("ADDED", text)
      .matches("SHOW")
  ) {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    state.matches("AUTHENTICATED")?.app.notification.send("EXPIRED");
  }
};

export const onBacklogUpdate: Action<BacklogItems> = (
  { state },
  backlogItems
) => {
  state.matches("AUTHENTICATED")?.app.send("BACKLOG_UPDATED", backlogItems);
};

export const onWeekDaysUpdate: Action<DaysByBacklogItem> = (
  { state },
  days
) => {
  state.matches("AUTHENTICATED")?.app.send("DAYS_UPDATED", days);
};

export const toggleBacklogItemWeekDay: Action<{
  date: string;
  backlogItemId: string;
}> = ({ state, effects }, { date, backlogItemId }) => {
  if (state.matches("AUTHENTICATED")) {
    effects.api.setBacklogItemOnWeekDay(state.profile, date, backlogItemId);
  }
};

export const changeDescription: Action<string> = ({ state }, description) => {
  state
    .matches("AUTHENTICATED")
    ?.app.matches("ADD_BACKLOG_ITEM")
    ?.addBacklogItem.send("DESCRIPTION_CHANGED", description);
};

export const toggleActiveWeekday: Action<number> = ({ state }, weekday) => {
  state
    .matches("AUTHENTICATED")
    ?.app.matches("ADD_BACKLOG_ITEM")
    ?.addBacklogItem.send("ACTIVE_WEEKDAYS_CHANGED", weekday);
};

export const setDate: Action<number> = ({ state }, date) => {
  state
    .matches("AUTHENTICATED")
    ?.app.matches("ADD_BACKLOG_ITEM")
    ?.addBacklogItem.send("DATE_CHANGED", date);
};

export const setSelection: Action<CurrentSelection> = (
  { state },
  selection
) => {
  state
    .matches("AUTHENTICATED")
    ?.app.matches("ADD_BACKLOG_ITEM")
    ?.addBacklogItem.send("SELECTION_CHANGED", selection);
};

export const addBacklogItem: AsyncAction = async ({
  state,
  effects,
  actions
}) => {
  const authState = state.matches("AUTHENTICATED");
  const addBacklogItemState = authState?.app.matches("ADD_BACKLOG_ITEM")
    ?.addBacklogItem;

  if (
    authState &&
    addBacklogItemState &&
    addBacklogItemState.send("ADDING").matches("ADDING")
  ) {
    const profile = authState.profile;

    try {
      const doc = effects.api.createBacklogItem(profile);
      await effects.api.addBacklogItem(doc, {
        description: addBacklogItemState.description,
        ...(addBacklogItemState.currentSelection === CurrentSelection.DATE
          ? {
              date: addBacklogItemState.date
            }
          : {})
      });
      await Promise.all(
        addBacklogItemState.activeWeekdays.map((weekDay) =>
          effects.api.setBacklogItemOnWeekDay(
            profile,
            getCurrentWeekDayId(weekDay),
            doc.id
          )
        )
      );

      if (addBacklogItemState.send("ADD_RESOLVED").matches("INITIAL")) {
        actions.showNotification("Backlog item added!");
        authState.app.send("HOME_NAVIGATED");
      }
    } catch (error) {
      addBacklogItemState.send("ADD_REJECTED", error.message);
    }
  }
};
