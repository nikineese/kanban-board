import { Ticket } from "../../model";

export const sortTicketsByPosition = (tickets: Ticket[]) =>
  Array.from(tickets).sort((a, b) => a.position - b.position);
