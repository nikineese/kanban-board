import { Ticket } from "@/entities/board";

export const defaultTicket: Ticket = {
  title: "",
  id: "",
  status: "",
  type: "task",
  description: "",
  creationDate: new Date().toISOString(),
  expectedHours: 0,
  assignedEmployee: "",
  position: 999, // value for pos ticket in the end of column
};
