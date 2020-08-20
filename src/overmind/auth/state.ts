import { User } from "firebase";
import { statemachine } from "overmind";

export type Profile = {
  uid: string;
  name: string;
  familyUid?: string;
};

type State =
  | {
      state: "AUTHENTICATING";
    }
  | {
      state: "UNAUTHENTICATED";
      user: null;
      profile: null;
      error: string | null;
    }
  | {
      state: "AUTHENTICATED";
      user: User;
      profile: Profile;
    }
  | {
      state: "INVALID_ENV";
    };

export const state = statemachine<State>(
  {
    AUTHENTICATING: ["UNAUTHENTICATED", "AUTHENTICATED", "INVALID_ENV"],
    AUTHENTICATED: ["UNAUTHENTICATED"],
    UNAUTHENTICATED: ["AUTHENTICATING"],
    INVALID_ENV: []
  },
  {
    state: "AUTHENTICATING"
  }
);
