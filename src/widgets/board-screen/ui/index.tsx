import React from "react";
import { useGetBoardScreenState } from "@/entities/board-screen";
import { Board } from "@/features/board";
import { BoardMode } from "@/shared/lib";
import { Login } from "@/features/login";

export const BoardScreen: React.FC = () => {
  const { mode, boardId } = useGetBoardScreenState();

  if (mode === BoardMode.LOGIN) return <Login />;

  return <Board id={boardId} />;
};
