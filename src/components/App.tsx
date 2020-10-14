import * as React from "react";
import { useAppState } from "../hooks";
import { ScreenContainer } from "../ui-components/ScreenContainer";
import { Notification } from "../ui-components/Notification";
import { AddBacklogItem } from "./AddBacklogItem";
import { Auth } from "./Auth";
import { Home } from "./Home";
import { EditCurrentWeek } from "./EditCurrentWeek";
import { EditNextWeek } from "./EditNextWeek";

const pages = {
  HOME: Home,
  ADD_BACKLOG_ITEM: AddBacklogItem,
  EDIT_CURRENT_WEEK: EditCurrentWeek,
  EDIT_NEXT_WEEK: EditNextWeek
};

export default function App() {
  const state = useAppState();

  let page;

  if (state.current === "AUTHENTICATED") {
    const notification =
      state.app.notification.current === "SHOW" ? (
        <Notification>{state.app.notification.content}</Notification>
      ) : null;
    const Page = pages[state.app.current];

    page = (
      <>
        <Page />
        {notification}
      </>
    );
  } else if (state.current === "AUTHENTICATING") {
    page = <ScreenContainer>Loading...</ScreenContainer>;
  } else if (state.current === "INVALID_ENV") {
    return (
      <ScreenContainer>
        You can not authenticate when the app is running in an iFrame, please
        open the app in a tab and then refresh the iframe
      </ScreenContainer>
    );
  } else if (state.current === "UNAUTHENTICATED") {
    page = <Auth />;
  } else {
    page = <span>"Invalid page"</span>;
  }

  return page;
}
