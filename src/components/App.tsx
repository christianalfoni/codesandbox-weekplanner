import * as React from "react";
import { useAppState } from "../hooks";
import { ScreenContainer } from "../ui-components/ScreenContainer";
import { Notification } from "../ui-components/Notification";
import { AddBacklogItem } from "./AddBacklogItem";
import { Auth } from "./Auth";
import { Home } from "./Home";
import { EditCurrentWeek } from "./EditCurrentWeek";

export default function App() {
  const state = useAppState();

  let page;

  if (state.auth.matches("AUTHENTICATING")) {
    page = <ScreenContainer>Loading...</ScreenContainer>;
  } else if (state.auth.matches("INVALID_ENV")) {
    return (
      <ScreenContainer>
        You can not authenticate when the app is running in an iFrame, please
        open the app in a tab and then refresh the iframe
      </ScreenContainer>
    );
  } else if (state.auth.matches("UNAUTHENTICATED")) {
    page = <Auth />;
  } else if (state.matches("HOME")) {
    page = <Home />;
  } else if (state.matches("ADD_BACKLOG_ITEM")) {
    page = <AddBacklogItem />;
  } else if (state.matches("EDIT_CURRENT_WEEK")) {
    page = <EditCurrentWeek />;
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
