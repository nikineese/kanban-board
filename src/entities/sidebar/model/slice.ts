import { useSelector } from "react-redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RecentlyBoard, SidebarState } from "./types";
import { AppState } from "../../redux";
import { localStorageInstance } from "@/shared/config";
import { LSKeys, removeDuplicatesObjectsByProp } from "@/shared/lib";

const initialState: SidebarState = {
  boards: [],
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    preloadRecViewedBoard: (
      state,
      { payload }: PayloadAction<RecentlyBoard[] | null>
    ) => {
      if (payload) {
        return {
          boards: removeDuplicatesObjectsByProp<
            RecentlyBoard,
            RecentlyBoard["id"]
          >(payload, (state) => state.id),
        };
      }
    },
    addBoardToRecViewed: (state, { payload }: PayloadAction<RecentlyBoard>) => {
      const boardsWithNewBoard = removeDuplicatesObjectsByProp(
        [...state.boards, payload],
        (state) => state.id
      );
      localStorageInstance.set(LSKeys.REC_VIEWED_BOARDS, boardsWithNewBoard);
      return {
        boards: boardsWithNewBoard,
      };
    },
    removeBoardFromRecViewed: (state, { payload }: PayloadAction<string>) => {
      const boardsWithoutDeletedItem = state.boards.filter(
        (board) => board.id !== payload
      );
      localStorageInstance.set<RecentlyBoard[]>(
        LSKeys.REC_VIEWED_BOARDS,
        boardsWithoutDeletedItem
      );
      return {
        boards: boardsWithoutDeletedItem,
      };
    },
  },
});

export const useGetSidebarState = () =>
  useSelector((state: AppState) => state.sidebar);

export const {
  preloadRecViewedBoard,
  addBoardToRecViewed,
  removeBoardFromRecViewed,
} = sidebarSlice.actions;

export const sideBarReducer = sidebarSlice.reducer;
