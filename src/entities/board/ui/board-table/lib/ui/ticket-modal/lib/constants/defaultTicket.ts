import { Ticket } from "../../../../../model";

export const defaultTicket: Ticket = {
  title: "",
  id: "",
  status: { id: "", colName: "" },
  type: "task",
  description: "",
  creationDate: new Date().toISOString(),
  expectedHours: 0,
  assignedEmployee: "",
  position: 999, // value for pos ticket in the end of column
};
