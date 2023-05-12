import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { sideBarReducer, sidebarSlice } from "../sidebar";
import { boardApi, boardApiReducer, boardReducer } from "../board";
import { globalMiddleware } from "./middlewares";
import { sideEffectsReducer, sideEffectsSlice } from "./side-effects";
import { boardScreenReducer, boardScreenSlice } from "../board-screen";
import { boardTableApi, boardTableApiReducer } from "../board/ui";
import { boardSlice } from "../board";

const makeStore = () =>
  configureStore({
    reducer: {
      [sidebarSlice.name]: sideBarReducer,
      [boardApi.reducerPath]: boardApiReducer,
      [boardTableApi.reducerPath]: boardTableApiReducer,
      [boardScreenSlice.name]: boardScreenReducer,
      [sideEffectsSlice.name]: sideEffectsReducer,
      [boardSlice.name]: boardReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat([boardApi.middleware, boardTableApi.middleware])
        .concat(globalMiddleware),
  });
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;

export const wrapper = createWrapper<AppStore>(makeStore);
