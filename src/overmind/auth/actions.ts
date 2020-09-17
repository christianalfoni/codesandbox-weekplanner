import { User } from "firebase";
import { AsyncAction, Action } from "overmind";

export const onAuthChanged: AsyncAction<User | null> = async (
  { state, effects, actions },
  user
) => {
  if (user) {
    try {
      const profile = await effects.api.getProfile(user);

      return state.auth.transition(
        "AUTHENTICATED",
        {
          user,
          profile
        },
        () =>
          state.transition("HOME", {}, () => {
            effects.api.streamBacklog(profile, actions.onBacklogUpdate);
            effects.api.streamWeekDays(profile, actions.onWeekDaysUpdate);
          })
      );
    } catch (error) {
      return state.auth.transition(
        "UNAUTHENTICATED",
        {
          error: error.message
        },
        () => {
          effects.api.disposeStreamBacklog();
        }
      );
    }
  } else if (effects.browser.isIframe()) {
    return state.auth.transition("INVALID_ENV", {});
  } else {
    return state.auth.transition("UNAUTHENTICATED", {}, () => {
      effects.api.disposeStreamBacklog();
    });
  }
};

export const signIn: Action = ({ state, effects }) =>
  state.auth.transition("AUTHENTICATING", {}, () => {
    effects.api.signIn();
  });

export const signOut: Action = ({ effects }) => {
  effects.api.signOut();
};
