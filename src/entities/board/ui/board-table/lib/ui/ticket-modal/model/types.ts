import { Board } from "../../../../../../model";
import { TicketType, Ticket, ModalMode } from "../../../../model";

export type TicketModalParams = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  board?: Board;
  ticketTypes?: TicketType[];
  view?: ModalMode<Ticket>;
};
