import { OnInitialize } from "overmind";

export const onInitialize: OnInitialize = ({ actions, effects }) => {
  effects.api.initialize(actions.auth.onAuthChanged);
};
