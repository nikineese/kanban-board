import { Ticket } from "@/entities/board";

export const mapTicketsPosition = (tickets: Ticket[]) =>
  tickets.map((ticket, idx) => ({ ...ticket, position: idx }));
