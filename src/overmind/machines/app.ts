import { derived, statemachine, Statemachine } from "overmind";
import {
  getDaysOfCurrentWeek,
  getDaysOfNextWeek,
  getDaysOfPreviousWeek
} from "../utils";
import {
  AddBacklogItemMachine,
  createAddBacklogItemMachine
} from "./addBacklogItem";
import { createNotificationMachine, NotificationMachine } from "./notification";

export type WeekDays = {
  0: string[];
  1: string[];
  2: string[];
  3: string[];
  4: string[];
  5: string[];
  6: string[];
};

export type BacklogItem = {
  id: string;
  created: number;
  date: number | null;
  description: string;
  days: {
    [uid: string]: string[];
  };
};

export type DaysByBacklogItem = {
  [backlogItemId: string]: {
    [uid: string]: string[];
  };
};

export type BacklogItems = { [uid: string]: BacklogItem };

type States =
  | {
      current: "HOME";
    }
  | {
      current: "ADD_BACKLOG_ITEM";
      addBacklogItem: AddBacklogItemMachine;
    }
  | {
      current: "EDIT_NEXT_WEEK";
    }
  | {
      current: "EDIT_CURRENT_WEEK";
    };

type BaseState = {
  backlog: BacklogItems;
  days: DaysByBacklogItem;
  backlogList: BacklogItem[];
  previousWeekDays: string[];
  notification: NotificationMachine;
  currentWeekDays: string[];
  nextWeekDays: string[];
  addBacklogItem?: AddBacklogItemMachine;
};

type Events =
  | {
      type: "HOME_NAVIGATED";
    }
  | {
      type: "ADD_BACKLOG_ITEM_NAVIGATED";
    }
  | {
      type: "EDIT_NEXT_WEEK_NAVIGATED";
    }
  | {
      type: "EDIT_CURRENT_WEEK_NAVIGATED";
    }
  | {
      type: "BACKLOG_UPDATED";
      data: BacklogItems;
    }
  | {
      type: "DAYS_UPDATED";
      data: DaysByBacklogItem;
    };

export type AppMachine = Statemachine<States, Events, BaseState>;

export const appMachine = statemachine<States, Events, BaseState>({
  HOME_NAVIGATED: () => ({ current: "HOME" }),
  ADD_BACKLOG_ITEM_NAVIGATED: (state) => {
    if (state.current === "HOME") {
      return {
        current: "ADD_BACKLOG_ITEM",
        addBacklogItem: createAddBacklogItemMachine()
      };
    }
  },
  EDIT_NEXT_WEEK_NAVIGATED: (state) => {
    if (state.current === "HOME") return { current: "EDIT_NEXT_WEEK" };
  },
  EDIT_CURRENT_WEEK_NAVIGATED: (state) => {
    if (state.current === "HOME") return { current: "EDIT_CURRENT_WEEK" };
  },
  BACKLOG_UPDATED: (state, update) => {
    Object.assign(state.backlog, update);
  },
  DAYS_UPDATED: (state, update) => {
    Object.assign(state.days, update);
  }
});

export const createAppMachine = () => {
  return appMachine.create(
    {
      current: "HOME"
    },
    {
      backlog: {},
      days: {},
      notification: createNotificationMachine(),
      backlogList: derived((state: AppMachine) => {
        return Object.values(state.backlog);
      }),
      previousWeekDays: getDaysOfPreviousWeek(),
      currentWeekDays: getDaysOfCurrentWeek(),
      nextWeekDays: getDaysOfNextWeek()
    }
  );
};
