import * as React from "react";
import { useAppState, useActions } from "../hooks";
import { ScreenContainer } from "../ui-components/ScreenContainer";
import { Error } from "../ui-components/Error";

export const Auth: React.FC = () => {
  const state = useAppState();
  const actions = useActions();

  if (state.current === "UNAUTHENTICATED") {
    return (
      <ScreenContainer>
        <div>
          {state.error ? <Error>{state.error}</Error> : null}
          <button onClick={() => actions.signIn()}>
            Log in for an awesome experience
          </button>
        </div>
      </ScreenContainer>
    );
  }

  return null;
};
