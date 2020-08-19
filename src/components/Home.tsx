import * as React from "react";
import { useActions } from "../hooks";
import { styled } from "../css";
import { ScreenContainer } from "../ui-components/ScreenContainer";
import { FloatingButton } from "../ui-components/FloatingButton";
import { FaPlus } from "react-icons/fa";

const AddBacklogItemButton = styled(FloatingButton, {
  bottom: "1rem",
  right: "1rem",
  color: "white",
  backgroundColor: "main",
  borderColor: "black"
});

export const Home: React.FC = () => {
  const actions = useActions();

  return (
    <ScreenContainer>
      <div>Hello world, I am home!</div>
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
