import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { AppState } from "../";
import { SideEffectsState } from "./types";
import { ErrorMessages } from "@/shared/lib";

const initialState: SideEffectsState = {
  error: { isErrorPopupOpen: false, message: ErrorMessages.EMPTY },
};

export const sideEffectsSlice = createSlice({
  name: "sideEffects",
  initialState,
  reducers: {
    setError: (
      state,
      { payload }: PayloadAction<SideEffectsState["error"]>
    ) => {
      return { error: payload };
    },
  },
});

export const useSideEffectsState = () =>
  useSelector((state: AppState) => state.sideEffects);

export const { setError } = sideEffectsSlice.actions;

export const sideEffectsReducer = sideEffectsSlice.reducer;
