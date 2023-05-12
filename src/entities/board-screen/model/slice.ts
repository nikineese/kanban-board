import { useSelector } from "react-redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../redux";
import { BoardMode } from "@/shared/lib";
import { BoardScreenState } from "./types";

const initialState: BoardScreenState = {
  boardId: "",
  mode: BoardMode.LOGIN,
};

export const boardScreenSlice = createSlice({
  name: "boardScreen",
  initialState,
  reducers: {
    openBoard: (state, { payload }: PayloadAction<string>) => ({
      boardId: payload,
      mode: BoardMode.VIEW,
    }),
    openLogin: (state) => ({
      ...state,
      boardId: "",
      mode: BoardMode.LOGIN,
    }),
  },
});

export const useGetBoardScreenState = () =>
  useSelector((state: AppState) => state.boardScreen);

export const { openBoard, openLogin } = boardScreenSlice.actions;

export const boardScreenReducer = boardScreenSlice.reducer;
