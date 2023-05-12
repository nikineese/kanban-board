import { Action, Dispatch } from "@reduxjs/toolkit";

export const dispatchMultipleActions = (
  dispatch: Dispatch,
  actions: Action[]
) => {
  actions.forEach((act) => dispatch(act));
};
