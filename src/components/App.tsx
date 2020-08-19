import * as React from "react";
import { useAppState } from "../hooks";
import { ScreenContainer } from "../ui-components/ScreenContainer";
import { Notification } from "../ui-components/Notification";
import { AddBacklogItem } from "./AddBacklogItem";
import { Auth } from "./Auth";
import { Home } from "./Home";

export default function App() {
  const state = useAppState();

  let page;

  if (state.auth.matches("AUTHENTICATING")) {
    page = <ScreenContainer>Loading...</ScreenContainer>;
  } else if (state.auth.matches("UNAUTHENTICATED")) {
    page = <Auth />;
  } else if (state.matches("HOME")) {
    page = <Home />;
  } else if (state.matches("ADD_BACKLOG_ITEM")) {
    page = <AddBacklogItem />;
  } else {
    page = <span>"Invalid page"</span>;
  }

  return (
    <>
      {page}
      {state.notification ? (
        <Notification>{state.notification}</Notification>
      ) : null}
    </>
  );
}
