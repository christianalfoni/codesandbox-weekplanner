import * as React from "react";
import { useAppState } from "../hooks";
import { Container } from "../ui-components/Container";

export const EditCurrentWeek: React.FC = () => {
  const state = useAppState();

  return (
    <Container>
      {state.backlogList.map((backlogItem) => (
        <div>
          {backlogItem.description} {JSON.stringify(state.days[backlogItem.id])}
        </div>
      ))}
    </Container>
  );
};
