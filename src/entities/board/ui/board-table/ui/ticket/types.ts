import { Ticket } from "../../model";
import { Board } from "../../../../model";

export type BoardTicketParams = {
  board: Board;
  ticket: Ticket;
  index: number;
};
