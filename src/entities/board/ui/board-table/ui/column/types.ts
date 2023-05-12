import { Board } from "../../../../model";

export type BoardColumnParams = {
  colId: string;
  column: string;
  isColPosFirst: boolean;
  index: number;
  board: Board;
  setCreateTicketModalOpen: (isModalOpen: boolean) => void;
};
