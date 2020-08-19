import * as React from "react";
import { useAppState, useActions } from "../hooks";
import { styled } from "../css";
import { FloatingButton } from "../ui-components/FloatingButton";
import { ScreenContainer } from "../ui-components/ScreenContainer";
import { FaArrowLeft } from "react-icons/fa";
import { CurrentSelection } from "../overmind/backlogItem/state";
import { WeekdayPicker } from "../ui-components/WeekdayPicker";
import { Calendar } from "../ui-components/Calendar";

const BackButton = styled(FloatingButton, {
  top: "1rem",
  left: "1rem",
  color: "black",
  backgroundColor: "transparent",
  border: "0",
  boxShadow: "none"
});

const AddButton = styled(FloatingButton, {
  top: "1rem",
  right: "1rem",
  backgroundColor: "main",
  borderColor: "black",
  color: "white"
});

const TextArea = styled.textarea({
  resize: "none",
  height: 5,
  width: "100%"
});

const Content = styled.div({
  padding: 6,
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "stretch",
  MOBILE: {
    padding: 3
  }
});

const UserWeekdays = styled.div({
  display: "flex",
  flex: 1,
  justifyContent: "space-between",
  marginTop: 2,
  marginBottom: 2
});

const SelectionContainer = styled.div({
  display: "flex",
  alignItems: "center",
  marginBottom: 3,
  marginTop: 3
});

const SelectionButton = styled.input({
  margin: [2, 3, 2]
});

export const AddBacklogItem: React.FC = () => {
  const state = useAppState().backlogItem;
  const actions = useActions();
  const canAddItem = Boolean(state.description);

  return (
    <ScreenContainer>
      <BackButton
        onClick={() => {
          actions.openScreen("HOME");
        }}
      >
        <FaArrowLeft />
      </BackButton>
      <AddButton
        disabled={!canAddItem}
        variant={!canAddItem && "muted"}
        onClick={() => actions.backlogItem.addBacklogItem()}
      >
        Add
      </AddButton>
      <Content>
        <TextArea
          disabled={state.matches("ADDING")}
          value={state.description}
          onChange={(event) =>
            actions.backlogItem.changeDescription(event.target.value)
          }
        />
        <SelectionContainer
          onClick={() => {
            actions.backlogItem.setSelection(CurrentSelection.NO_DUE_DATE);
          }}
        >
          <SelectionButton
            disabled={state.matches("ADDING")}
            type="radio"
            readOnly
            checked={state.currentSelection === CurrentSelection.NO_DUE_DATE}
          />
          No due date
        </SelectionContainer>
        <SelectionContainer
          onClick={() => {
            actions.backlogItem.setSelection(CurrentSelection.WEEKDAYS);
          }}
        >
          <SelectionButton
            disabled={state.matches("ADDING")}
            type="radio"
            readOnly
            checked={state.currentSelection === CurrentSelection.WEEKDAYS}
          />
          <UserWeekdays>
            <WeekdayPicker
              disabled={state.matches("ADDING")}
              activeWeekdays={state.activeWeekdays}
              onChange={actions.backlogItem.toggleActiveWeekday}
            />
          </UserWeekdays>
        </SelectionContainer>
        <SelectionContainer
          onClick={() => {
            actions.backlogItem.setSelection(CurrentSelection.DATE);
          }}
        >
          <SelectionButton
            disabled={state.matches("ADDING")}
            readOnly
            type="radio"
            checked={state.currentSelection === CurrentSelection.DATE}
          />
          <Calendar
            disabled={state.matches("ADDING")}
            date={state.date}
            onChange={actions.backlogItem.setDate}
          />
        </SelectionContainer>
      </Content>
    </ScreenContainer>
  );
};
