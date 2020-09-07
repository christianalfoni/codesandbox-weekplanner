import * as React from "react";
import { useActions } from "../hooks";
import { styled } from "../css";
import { ScreenContainer } from "../ui-components/ScreenContainer";
import { FloatingButton } from "../ui-components/FloatingButton";
import { FaPlus, FaCalendar } from "react-icons/fa";

const AddBacklogItemButton = styled(FloatingButton, {
  bottom: "1rem",
  right: "1rem",
  color: "white",
  backgroundColor: "main",
  borderColor: "black"
});

const Logout = styled.button({
  position: "absolute",
  top: "1rem",
  right: "1rem",
  backgroundColor: "transparent",
  border: 0,
  textDecoration: "underline"
});

const Content = styled.div({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%"
});

const ContentRow = styled.div({
  display: "flex",
  flex: 1
});

const ContentCell = styled.div({
  display: "flex",
  flex: 1,
  alignItems: "center",
  justifyContent: "center"
});

const CalendarIcon = styled(FaCalendar, {
  fontSize: "4rem"
});

export const Home: React.FC = () => {
  const actions = useActions();

  return (
    <ScreenContainer>
      <Content>
        <Logout onClick={() => actions.auth.signOut()}>Log out</Logout>
        <ContentRow
          onClick={() => {
            actions.openScreen("EDIT_CURRENT_WEEK");
          }}
        >
          <ContentCell>
            <CalendarIcon />
          </ContentCell>
          <ContentCell>hopp</ContentCell>
        </ContentRow>
        <ContentRow>
          <ContentCell>BLIP</ContentCell>
        </ContentRow>
      </Content>
      <AddBacklogItemButton
        onClick={() => {
          actions.openScreen("ADD_BACKLOG_ITEM");
        }}
      >
        <FaPlus />
      </AddBacklogItemButton>
    </ScreenContainer>
  );
};
