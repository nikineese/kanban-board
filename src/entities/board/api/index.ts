import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "@firebase/firestore";
import { db } from "@/shared/config";
import { Board } from "../model";
import { ErrorMessages } from "@/shared/lib";
import { BoardApiError } from "./types";

export const boardApi = createApi({
  baseQuery: fakeBaseQuery<BoardApiError>(),
  tagTypes: ["Board"],
  endpoints: (builder) => ({
    fetchBoardById: builder.query<Board, string>({
      async queryFn(id) {
        if (!id) {
          return { error: { message: ErrorMessages.ENTER_CORRECT_VALUE } };
        }
        try {
          const ref = doc(db, "boards", id);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            return { data: snap.data() as Board };
          } else {
            return { error: { message: ErrorMessages.BOARD_IS_NOT_EXIST } };
          }
        } catch {
          return { error: { message: ErrorMessages.UNHANDLED_ERROR } };
        }
      },
      providesTags: ["Board"],
    }),
    createNewBoard: builder.mutation<Board, Board>({
      async queryFn(board) {
        try {
          const ref = doc(db, "boards", board.id);
          await setDoc(ref, board);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            return { data: snap.data() as Board };
          } else {
            return { error: { message: ErrorMessages.BOARD_WAS_NOT_CREATED } };
          }
        } catch {
          return { error: { message: ErrorMessages.UNHANDLED_ERROR } };
        }
      },
      invalidatesTags: ["Board"],
    }),
    updateBoard: builder.mutation<Board, Board>({
      async queryFn(board) {
        try {
          const ref = doc(db, "boards", board.id);
          await updateDoc(ref, board);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            return {
              data: snap.data() as Board,
            };
          } else {
            return { error: { message: ErrorMessages.BOARD_WAS_NOT_UPDATED } };
          }
        } catch {
          return { error: { message: ErrorMessages.UNHANDLED_ERROR } };
        }
      },
      invalidatesTags: ["Board"],
    }),
    removeBoard: builder.mutation<unknown, Board>({
      async queryFn(board) {
        try {
          const ref = doc(db, "boards", board.id);
          await deleteDoc(ref);
          const snap = await getDoc(ref);
          if (!snap.exists()) {
            return {
              data: null,
            };
          } else {
            return { error: { message: ErrorMessages.BOARDS_WAS_NOT_REMOVED } };
          }
        } catch {
          return { error: { message: ErrorMessages.UNHANDLED_ERROR } };
        }
      },
    }),
  }),
});

export const boardApiReducer = boardApi.reducer;
export const {
  useFetchBoardByIdQuery,
  useCreateNewBoardMutation,
  useUpdateBoardMutation,
  useRemoveBoardMutation,
} = boardApi;
