import type { Middleware } from "@reduxjs/toolkit";
import { isFulfilled, isRejectedWithValue } from "@reduxjs/toolkit";
import { setError } from "../../side-effects";
import { dispatchMultipleActions } from "@/shared/lib";
import { openBoard, openLogin } from "../../../board-screen";
import {
  addBoardToRecViewed,
  removeBoardFromRecViewed,
} from "../../../sidebar";
import { endpoints } from "../../constants";

export const globalMiddleware: Middleware = () => (next) => (action) => {
  const endpointName = action?.meta?.arg?.endpointName;
  if (endpointName === endpoints.fetchBoardById.name) {
    if (isRejectedWithValue(action)) {
      const rejectedBoardId = action.meta.arg.originalArgs;
      dispatchMultipleActions(next, [
        setError({ isErrorPopupOpen: true, message: action.payload.message }),
        removeBoardFromRecViewed(rejectedBoardId),
        openLogin(),
      ]);
    }
    if (isFulfilled(action)) {
      next(
        addBoardToRecViewed({
          id: action.payload.id,
          title: action.payload.title,
        })
      );
    }
  }
  if (endpointName === endpoints.createNewBoard.name) {
    if (isFulfilled(action)) {
      next(openBoard(action.payload.id));
    }
  }
  return next(action);
};
