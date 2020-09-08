import * as React from "react";
import { useAppState, useActions } from "../hooks";
import { styled } from "../css";

const Card = styled.div({});

const Description = styled.div({});

export const BacklogItem: React.FC<{ id: string }> = React.memo(({ id }) => {
  const state = useAppState();
  const actions = useActions();
  const backlogItem = state.backlog[id];

  return (
    <Card>
      <Description> {backlogItem.description}</Description>
      {}
    </Card>
  );
});
