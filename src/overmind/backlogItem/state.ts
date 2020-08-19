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
    } & BaseState
  | {
      state: "INVALID";
    } & BaseState
  | {
      state: "ERROR";
      error: string;
    } & BaseState
  | {
      state: "ADDING";
      error: string;
    } & BaseState;

export const state = statemachine<State>(
  {
    INVALID: ["VALID"],
    VALID: ["INVALID", "ADDING", "VALID"],
    ERROR: ["INVALID"],
    ADDING: ["INVALID", "ERROR"]
  },
  {
    state: "INVALID",
    currentSelection: CurrentSelection.NO_DUE_DATE,
    description: "",
    activeWeekdays: [],
    date: Date.now()
  }
);
