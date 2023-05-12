import { Board, Ticket, TicketType } from "@/entities/board";

export type TicketModalParams = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  board?: Board;
  ticketTypes?: TicketType[];
  view?: { isView: boolean; viewTicket?: Ticket };
};
