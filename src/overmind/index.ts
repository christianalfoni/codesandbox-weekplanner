import { derived, IConfig } from "overmind";
import * as effects from "./effects";
import { onInitialize } from "./onInitialize";
import { createAuthMachine } from "./machines/auth";
import * as actions from "./actions";

export const config = {
  onInitialize,
  effects,
  state: createAuthMachine(),
  actions
};

declare module "overmind" {
  interface Config extends IConfig<typeof config> {}
}
