import * as React from "react";
import { useActions } from "../hooks";
import { styled } from "../css";
import { ScreenContainer } from "../ui-components/ScreenContainer";
import { FloatingButton } from "../ui-components/FloatingButton";
import { FaPlus, FaCalendar } from "react-icons/fa";
import { CurrentWeek } from "./CurrentWeek";

const AddBacklogItemButton = styled(FloatingButton, {
  bottom: "1rem",
  right: "1rem",
  color: "$white",
  backgroundColor: "$main",
  borderColor: "$black",
  zIndex: 2
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
  position: "relative",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  alignItems: "center",
  justifyContent: "center"
});

const ContentText = styled.div({
  padding: ["$2", "$4"]
});

const CalendarIcon = styled(FaCalendar, {
  fontSize: "4rem"
});

export const Home: React.FC = () => {
  const actions = useActions();
  return (
    <ScreenContainer>
      <Content>
        <Logout onClick={() => actions.signOut()}>Log out</Logout>
        <ContentRow
          onClick={() => {
            actions.openEditCurrentWeek();
          }}
        >
          <ContentCell>
            <CalendarIcon />
            <ContentText>Current Week</ContentText>
          </ContentCell>
          <ContentCell
            onClick={() => {
              actions.openEditNextWeek();
            }}
          >
            <CalendarIcon />
            <ContentText>Next Week</ContentText>
          </ContentCell>
        </ContentRow>
        <ContentRow>
          <ContentCell style={{ width: "100%" }}>
            <CurrentWeek />
          </ContentCell>
        </ContentRow>
      </Content>
      <AddBacklogItemButton
        onClick={() => {
          actions.openAddBacklogItem();
        }}
      >
        <FaPlus />
      </AddBacklogItemButton>
    </ScreenContainer>
  );
};
