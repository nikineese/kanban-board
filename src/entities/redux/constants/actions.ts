import { boardScreenSlice } from "../../board-screen";
import { sidebarSlice } from "../../sidebar";
import { sideEffectsSlice } from "../side-effects";

export const actions = {
  ...boardScreenSlice.actions,
  ...sidebarSlice.actions,
  ...sideEffectsSlice.actions,
};
