import { statemachine } from "overmind";

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
};

export type BacklogItems = { [uid: string]: BacklogItem };

type BaseState = {
  backlog: BacklogItems;
  notification: string | null;
};

type State =
  | ({
      state: "INITIALIZING";
    } & BaseState)
  | ({
      state: "HOME";
    } & BaseState)
  | ({
      state: "ADD_BACKLOG_ITEM";
    } & BaseState)
  | ({
      state: "PLAN_NEXT_WEEK";
    } & BaseState)
  | ({
      state: "EDIT_CURRENT_WEEK";
    } & BaseState);

export const state = statemachine<State>(
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
    state: "INITIALIZING",
    backlog: {},
    notification: null
  }
);
