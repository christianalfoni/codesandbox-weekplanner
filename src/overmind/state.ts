import { statemachine, derived } from "overmind";
import {
  getDaysOfNextWeek,
  getDaysOfCurrentWeek,
  getDaysOfPreviousWeek
} from "./utils";

export type WeekDays = {
  0: string[];
  1: string[];
  2: string[];
  3: string[];
  4: string[];
  5: string[];
  6: string[];
};

export type Days = {
  [date: string]: {
    [uid: string]: {
      [backlogItemId: string]: true;
    };
  };
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

type BaseState = {
  backlog: BacklogItems;
  days: DaysByBacklogItem;
  backlogList: BacklogItem[];
  notification: string | null;
  previousWeekDays: string[];
  currentWeekDays: string[];
  nextWeekDays: string[];
};

type State =
  | {
      state: "INITIALIZING";
    }
  | {
      state: "HOME";
    }
  | {
      state: "ADD_BACKLOG_ITEM";
    }
  | {
      state: "PLAN_NEXT_WEEK";
    }
  | {
      state: "EDIT_CURRENT_WEEK";
    };

export const state = statemachine<State, BaseState>(
  {
    INITIALIZING: [
      "HOME",
      "ADD_BACKLOG_ITEM",
      "EDIT_CURRENT_WEEK",
      "PLAN_NEXT_WEEK"
    ],
    HOME: [
      "INITIALIZING",
      "ADD_BACKLOG_ITEM",
      "PLAN_NEXT_WEEK",
      "EDIT_CURRENT_WEEK"
    ],
    ADD_BACKLOG_ITEM: ["INITIALIZING", "HOME"],
    PLAN_NEXT_WEEK: ["INITIALIZING", "HOME"],
    EDIT_CURRENT_WEEK: ["INITIALIZING", "HOME"]
  },
  {
    state: "INITIALIZING"
  },
  {
    backlog: {},
    days: {},
    notification: null,
    backlogList: derived((state: BaseState) => {
      return Object.values(state.backlog);
    }),
    previousWeekDays: getDaysOfPreviousWeek(),
    currentWeekDays: getDaysOfCurrentWeek(),
    nextWeekDays: getDaysOfNextWeek()
  }
);
