import { Board } from "../../../../model";
import { TicketType } from "../../model";

export type BoardColumnParams = {
  colId: string;
  column: string;
  isColPosFirst: boolean;
  index: number;
  board: Board;
  ticketTypes?: TicketType[];
  setCreateTicketModalOpen: (isModalOpen: boolean) => void;
};
