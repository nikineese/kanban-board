import { Board, Ticket } from "@/entities/board";

export type SearchParams = {
  board: Board;
  searchInData: Ticket[];
};
