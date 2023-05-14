import { Ticket } from "@/entities/board";

export const sortTicketsByPosition = (tickets: Ticket[]) =>
  Array.from(tickets).sort((a, b) => a.position - b.position);
