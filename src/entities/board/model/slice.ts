import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { AppState } from "../../redux";
import { BoardState } from "./types";
import { Ticket } from "../ui";

const initialState: BoardState = {
  searchedTicket: null,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setSearchedTicket: (state, { payload }: PayloadAction<Ticket>) => ({
      ...state,
      searchedTicket: { ...payload },
    }),
  },
});

export const { setSearchedTicket } = boardSlice.actions;

export const useBoardState = () =>
  useSelector((state: AppState) => state.board);

export const boardReducer = boardSlice.reducer;
