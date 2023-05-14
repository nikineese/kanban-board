import { Board } from "@/entities/board";

export const filterTicketsWithExistingColumn = (board: Board) => ({
  ...board,
  tickets: board.tickets.filter((t) =>
    board.columns.some((col) => col.id === t.status.id)
  ),
});
