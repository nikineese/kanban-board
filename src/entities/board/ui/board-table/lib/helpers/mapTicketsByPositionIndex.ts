import { Ticket } from "../../model";

export const mapTicketsByPositionIndex = (tickets: Ticket[]) =>
  tickets.map((ticket, idx) => ({ ...ticket, position: idx }));
