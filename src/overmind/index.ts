import { IConfig } from "overmind";
import { merge, namespaced } from "overmind/config";
import { state } from "./state";
import * as effects from "./effects";
import * as actions from "./actions";
import { onInitialize } from "./onInitialize";
import * as auth from "./auth";
import * as backlogItem from "./backlogItem";

export const config = merge(
  {
    onInitialize,
    state,
    effects,
    actions
  },
  namespaced({
    auth,
    backlogItem
  })
);

declare module "overmind" {
  interface Config extends IConfig<typeof config> {}
}
