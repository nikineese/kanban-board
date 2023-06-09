import { Board } from "@/entities/board";

export const filterTicketsColumnExist = (board: Board) => ({
  ...board,
  tickets: board.tickets.filter((t) =>
    board.columns.some((col) => col.id === t.status.id)
  ),
});
