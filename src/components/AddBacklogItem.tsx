import * as React from "react";
import { useAppState, useActions } from "../hooks";
import { styled } from "../css";
import { FloatingButton } from "../ui-components/FloatingButton";
import { ScreenContainer } from "../ui-components/ScreenContainer";
import { FaArrowLeft } from "react-icons/fa";
import { CurrentSelection } from "../overmind/machines/addBacklogItem";
import { WeekdayPicker } from "../ui-components/WeekdayPicker";
import { Calendar } from "../ui-components/Calendar";
import { stringToColor } from "../overmind/utils";

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
  const rootState = useAppState();
  const actions = useActions();

  if (
    rootState.current === "AUTHENTICATED" &&
    rootState.app.current === "ADD_BACKLOG_ITEM"
  ) {
    const state = rootState.app.addBacklogItem;
    const canAddItem = Boolean(state.description);

    return (
      <ScreenContainer>
        <BackButton
          onClick={() => {
            actions.openHome();
          }}
        >
          <FaArrowLeft />
        </BackButton>
        <AddButton
          disabled={!canAddItem}
          variant={!canAddItem && "muted"}
          onClick={() => actions.addBacklogItem()}
        >
          Add
        </AddButton>
        <Content>
          <TextArea
            disabled={state.current === "ADDING"}
            value={state.description}
            onChange={(event) => actions.changeDescription(event.target.value)}
          />
          <SelectionContainer
            onClick={() => {
              actions.setSelection(CurrentSelection.NO_DUE_DATE);
            }}
          >
            <SelectionButton
              disabled={state.current === "ADDING"}
              type="radio"
              readOnly
              checked={state.currentSelection === CurrentSelection.NO_DUE_DATE}
            />
            No due date
          </SelectionContainer>
          <SelectionContainer
            onClick={() => {
              actions.setSelection(CurrentSelection.WEEKDAYS);
            }}
          >
            <SelectionButton
              disabled={state.current === "ADDING"}
              type="radio"
              readOnly
              checked={state.currentSelection === CurrentSelection.WEEKDAYS}
            />
            <UserWeekdays>
              <WeekdayPicker
                color={stringToColor(rootState.profile.uid)}
                disabled={state.current === "ADDING"}
                activeWeekdays={state.activeWeekdays}
                onChange={actions.toggleActiveWeekday}
              />
            </UserWeekdays>
          </SelectionContainer>
          <SelectionContainer
            onClick={() => {
              actions.setSelection(CurrentSelection.DATE);
            }}
          >
            <SelectionButton
              disabled={state.current === "ADDING"}
              readOnly
              type="radio"
              checked={state.currentSelection === CurrentSelection.DATE}
            />
            <Calendar
              disabled={state.current === "ADDING"}
              date={state.date}
              onChange={actions.setDate}
            />
          </SelectionContainer>
        </Content>
      </ScreenContainer>
    );
  }

  return null;
};
