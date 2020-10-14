import { statemachine, derived, Statemachine } from "overmind";
import { User } from "firebase";
import { AppMachine, createAppMachine } from "./app";

export type Profile = {
  uid: string;
  name: string;
  familyUid?: string;
};

type States = (
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
    }
) & {
  profiles: {
    [uid: string]: string;
  };
  app?: AppMachine;
  user?: User;
  profile?: Profile;
  error?: string;
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

export type AuthMachine = Statemachine<States, Events>;

export const authMachine = statemachine<States, Events>({
  AUTHENTICATING: (state) => {
    if (state.current === "UNAUTHENTICATED") return "AUTHENTICATING";
  },
  AUTHENTICATED: (state, { user, profile }) => {
    if (state.current === "AUTHENTICATING") {
      state.profile = profile;
      state.user = user;
      state.app = createAppMachine();
      return "AUTHENTICATED";
    }
  },
  UNAUTHENTICATED: (state, reason) => {
    if (
      state.current === "AUTHENTICATED" ||
      state.current === "AUTHENTICATING"
    ) {
      state.error = reason;
      return "UNAUTHENTICATED";
    }
  },
  INVALID_ENV: () => "INVALID_ENV"
});

export const createAuthMachine = () => {
  return authMachine.create({
    current: "AUTHENTICATING",
    profiles: derived((state: AuthMachine) => {
      const authState = state.matches("AUTHENTICATED");

      if (authState) {
        return {
          [authState.profile.uid]: authState.profile.name
        };
      }

      return {};
    })
  });
};
