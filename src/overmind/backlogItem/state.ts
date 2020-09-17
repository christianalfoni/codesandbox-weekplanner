import { statemachine } from "overmind";

export enum CurrentSelection {
  NO_DUE_DATE,
  WEEKDAYS,
  DATE
}

type BaseState = {
  description: string;
  currentSelection: CurrentSelection;
  activeWeekdays: number[];
  date: number;
};

type State =
  | {
      state: "VALID";
    }
  | {
      state: "INVALID";
    }
  | {
      state: "ERROR";
      error: string;
    }
  | {
      state: "ADDING";
    };

export const state = statemachine<State, BaseState>(
  {
    INVALID: ["VALID"],
    VALID: ["INVALID", "ADDING", "VALID"],
    ERROR: ["INVALID"],
    ADDING: ["INVALID", "ERROR"]
  },
  {
    state: "INVALID"
  },
  {
    currentSelection: CurrentSelection.NO_DUE_DATE,
    description: "",
    activeWeekdays: [],
    date: Date.now()
  }
);
