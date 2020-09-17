import { User } from "firebase";
import { statemachine, derived } from "overmind";

export type Profile = {
  uid: string;
  name: string;
  familyUid?: string;
};

type BaseState = {
  profiles: {
    [uid: string]: string;
  };
};

type State =
  | {
      state: "AUTHENTICATING";
    }
  | {
      state: "UNAUTHENTICATED";
      error?: string;
    }
  | {
      state: "AUTHENTICATED";
      user: User;
      profile: Profile;
    }
  | {
      state: "INVALID_ENV";
    };

export const state = statemachine<State, BaseState>(
  {
    AUTHENTICATING: ["UNAUTHENTICATED", "AUTHENTICATED", "INVALID_ENV"],
    AUTHENTICATED: ["UNAUTHENTICATED", "INVALID_ENV"],
    UNAUTHENTICATED: ["AUTHENTICATING"],
    INVALID_ENV: []
  },
  {
    state: "AUTHENTICATING"
  },
  {
    profiles: derived((state: State) => {
      if (state.state === "AUTHENTICATED") {
        return {
          [state.profile.uid]: state.profile.name
        };
      }

      return {};
    })
  }
);
