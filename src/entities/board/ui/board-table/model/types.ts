import { Board } from "../../../model";

export type BoardTableParams = {
  board: Board;
  setCreateTicketModalOpen: (isModalOpen: boolean) => void;
};
export type Column = {
  id: string;
  colName: string;
};
export type Ticket = {
  id: string;
  title: string;
  status: Column;
  type: TicketType;
  description: string;
  creationDate: string;
  expectedHours: number;
  assignedEmployee: string;
  position: number;
};
export type TicketType = "task" | "bug";
