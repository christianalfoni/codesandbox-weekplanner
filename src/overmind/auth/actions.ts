import { User } from "firebase";
import { AsyncAction, Action } from "overmind";

export const onAuthChanged: AsyncAction<User | null> = async (
  { state, effects, actions },
  user
) => {
  if (user) {
    try {
      const profile = await effects.api.getProfile(user);
      const authenticatedState = state.auth.transition("AUTHENTICATED");
      if (authenticatedState) {
        authenticatedState.user = user;
        authenticatedState.profile = profile;
        if (state.transition("HOME")) {
          effects.api.streamBacklog(profile, actions.onBacklogUpdate);
        }
      }
    } catch (error) {
      if (state.auth.transition("UNAUTHENTICATED")) {
        effects.api.disposeStreamBacklog();
      }
    }
  } else if (effects.browser.isIframe()) {
    state.auth.transition("INVALID_ENV");
  } else {
    if (state.auth.transition("UNAUTHENTICATED")) {
      effects.api.disposeStreamBacklog();
    }
  }
};

export const signIn: Action = ({ state, effects }) => {
  if (state.auth.transition("AUTHENTICATING")) {
    effects.api.signIn();
  }
};
