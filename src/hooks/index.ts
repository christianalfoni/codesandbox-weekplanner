import { createStateHook, createActionsHook } from "overmind-react";
import { config } from "../overmind";

export const useAppState = createStateHook<typeof config>();

export const useActions = createActionsHook<typeof config>();
