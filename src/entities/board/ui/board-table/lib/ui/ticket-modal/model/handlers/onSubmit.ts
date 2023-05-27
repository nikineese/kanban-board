import { Ticket } from "../../../../../model";
import { Guid } from "js-guid";
import { Board } from "../../../../../../../model";
import { sortTicketsByPosition } from "../../../../helpers";

export const makeOnSubmitTicketHandler =
  (isEditMode: boolean, updateBoard: (board: Board) => void, board?: Board) =>
  async (data: Ticket) => {
    if (!board) return;
    const newTickets = makeTicketsWithNewTicket(board, data, isEditMode);
    await updateBoard({ ...board, tickets: newTickets });
  };
const makeTicketsWithNewTicket = (
  board: Board,
  data: Ticket,
  isEditMode: boolean
) => {
  const tickets = Array.from(board.tickets);
  const newTicket: Ticket = {
    ...data,
    id: data.id || new Guid().toString(),
    status: data.status && data.status.id ? data.status : board.columns[0],
  };
  return sortTicketsByPosition([
    ...(isEditMode ? tickets.filter((t) => t.id !== data.id) : tickets),
    newTicket,
  ]);
};
