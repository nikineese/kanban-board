import { Ticket, TicketType } from "../../model";
import { Board } from "../../../../model";

export type BoardTicketParams = {
  board: Board;
  ticket: Ticket;
  index: number;
  ticketTypes?: TicketType[];
};
