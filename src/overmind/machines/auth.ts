import { statemachine, derived, Statemachine } from "overmind";
import { User } from "firebase";
import { AppMachine, createAppMachine } from "./app";

export type Profile = {
  uid: string;
  name: string;
  familyUid?: string;
};

type States =
  | {
      current: "AUTHENTICATING";
    }
  | {
      current: "UNAUTHENTICATED";
      reason: string;
    }
  | {
      current: "AUTHENTICATED";
      user: User;
      profile: Profile;
      app: AppMachine;
    }
  | {
      current: "INVALID_ENV";
    };

type BaseState = {
  profiles: {
    [uid: string]: string;
  };
};

type Events =
  | {
      type: "AUTHENTICATING";
    }
  | {
      type: "AUTHENTICATED";
      data: {
        user: User;
        profile: Profile;
      };
    }
  | {
      type: "UNAUTHENTICATED";
      data: string;
    }
  | {
      type: "INVALID_ENV";
    };

export type AuthMachine = Statemachine<States, Events, BaseState>;

export const authMachine = statemachine<States, Events, BaseState>({
  AUTHENTICATING: (state) => {
    if (state.current === "UNAUTHENTICATED")
      return { current: "AUTHENTICATING" };
  },
  AUTHENTICATED: (state, { user, profile }) => {
    if (state.current === "AUTHENTICATING") {
      return {
        current: "AUTHENTICATED",
        user,
        profile,
        app: createAppMachine()
      };
    }
  },
  UNAUTHENTICATED: (state, reason) => {
    if (
      state.current === "AUTHENTICATED" ||
      state.current === "AUTHENTICATING"
    ) {
      return { current: "UNAUTHENTICATED", reason };
    }
  },
  INVALID_ENV: () => ({ current: "INVALID_ENV" })
});

export const createAuthMachine = () => {
  return authMachine.create(
    {
      current: "AUTHENTICATING"
    },
    {
      profiles: derived((state: AuthMachine) => {
        const authState = state.matches("AUTHENTICATED");

        if (authState) {
          return {
            [authState.profile.uid]: authState.profile.name
          };
        }

        return {};
      })
    }
  );
};
