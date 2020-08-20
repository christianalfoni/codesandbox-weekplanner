import * as React from "react";
import { useAppState, useActions } from "../hooks";
import { ScreenContainer } from "../ui-components/ScreenContainer";

export const Auth: React.FC = () => {
  const state = useAppState().auth;
  const actions = useActions().auth;

  if (state.matches("UNAUTHENTICATED")) {
    return (
      <ScreenContainer>
        <div>
          <button onClick={() => actions.signIn()}>
            Log in for an awesome experience
          </button>
        </div>
      </ScreenContainer>
    );
  }

  return null;
};
