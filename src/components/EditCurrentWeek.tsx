import * as React from "react";
import { useAppState, useActions } from "../hooks";
import { Container } from "../ui-components/Container";
import { styled } from "../css";
import { FloatingButton } from "../ui-components/FloatingButton";
import { FaArrowLeft } from "react-icons/fa";
import { BacklogItem } from "./BacklogItem";

const BackButton = styled(FloatingButton, {
  top: "1rem",
  left: "1rem",
  color: "black",
  backgroundColor: "transparent",
  border: "0",
  boxShadow: "none"
});

const List = styled.div({
  paddingTop: 3
});

export const EditCurrentWeek: React.FC = () => {
  const state = useAppState();
  const actions = useActions();

  return (
    <Container>
      <BackButton
        onClick={() => {
          actions.openScreen("HOME");
        }}
      >
        <FaArrowLeft />
      </BackButton>
      <List>
        {state.backlogList.map((backlogItem) => (
          <BacklogItem
            key={backlogItem.id}
            id={backlogItem.id}
            currentWeekDates={state.currentWeekDays}
            previousWeekDates={state.previousWeekDays}
          />
        ))}
      </List>
    </Container>
  );
};
