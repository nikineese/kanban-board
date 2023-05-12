import { Column, Ticket } from "../ui";

export type Board = {
  title: string;
  id: string;
  columns: Column[];
  tickets: Ticket[];
};
export type BoardState = {
  searchedTicket: Ticket | null;
};
