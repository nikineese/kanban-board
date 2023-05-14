import { Ticket } from "@/entities/board";

export const mapTicketsByPositionIndex = (tickets: Ticket[]) =>
  tickets.map((ticket, idx) => ({ ...ticket, position: idx }));
