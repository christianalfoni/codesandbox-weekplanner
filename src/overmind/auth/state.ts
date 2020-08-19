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
    };

export const state = statemachine<State>(
  {
    AUTHENTICATING: ["UNAUTHENTICATED", "AUTHENTICATED"],
    AUTHENTICATED: ["UNAUTHENTICATED"],
    UNAUTHENTICATED: ["AUTHENTICATING"]
  },
  {
    state: "AUTHENTICATING"
  }
);
