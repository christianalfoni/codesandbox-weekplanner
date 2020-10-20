import { Statemachine, statemachine } from "overmind";

export enum CurrentSelection {
  NO_DUE_DATE,
  WEEKDAYS,
  DATE
}

type States =
  | {
      current: "INITIAL";
    }
  | {
      current: "VALID";
    }
  | {
      current: "ERROR";
      error: string;
    }
  | {
      current: "ADDING";
    };

type BaseState = {
  description: string;
  currentSelection: CurrentSelection;
  activeWeekdays: number[];
  date: number;
  error?: string;
};

type Events =
  | {
      type: "ADDING";
    }
  | {
      type: "DESCRIPTION_CHANGED";
      data: string;
    }
  | {
      type: "ACTIVE_WEEKDAYS_CHANGED";
      data: number;
    }
  | {
      type: "DATE_CHANGED";
      data: number;
    }
  | {
      type: "ADD_REJECTED";
      data: string;
    }
  | {
      type: "ADD_RESOLVED";
    }
  | {
      type: "SELECTION_CHANGED";
      data: CurrentSelection;
    };

export type AddBacklogItemMachine = Statemachine<States, Events, BaseState>;

export const addBacklogItemMachine = statemachine<States, Events, BaseState>({
  ADDING: (state) => {
    if (state.current === "VALID") return { current: "ADDING" };
  },
  DESCRIPTION_CHANGED: (state, description) => {
    state.description = description;

    return { current: description ? "VALID" : "INITIAL" };
  },
  ACTIVE_WEEKDAYS_CHANGED: ({ activeWeekdays }, weekday) => {
    if (activeWeekdays.includes(weekday)) {
      activeWeekdays.splice(activeWeekdays.indexOf(weekday), 1);
    } else {
      activeWeekdays.push(weekday);
    }
  },
  DATE_CHANGED: (state, date) => {
    state.date = date;
  },
  ADD_REJECTED: (state, error) => {
    if (state.current === "ADDING") {
      return { current: "ERROR", error };
    }
  },
  ADD_RESOLVED: (state) => {
    if (state.current === "ADDING") {
      state.activeWeekdays = [];
      state.currentSelection = CurrentSelection.NO_DUE_DATE;
      state.description = "";

      return { current: "INITIAL" };
    }
  },
  SELECTION_CHANGED: (state, selection) => {
    if (state.current !== "ADDING") {
      state.currentSelection = selection;
    }
  }
});

export const createAddBacklogItemMachine = () => {
  return addBacklogItemMachine.create(
    {
      current: "INITIAL"
    },
    {
      currentSelection: CurrentSelection.NO_DUE_DATE,
      description: "",
      activeWeekdays: [],
      date: Date.now()
    }
  );
};
