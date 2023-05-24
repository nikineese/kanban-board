import { Ticket } from "../../../../../model";
import { Guid } from "js-guid";
import { Board } from "../../../../../../../model";

export const makeOnSubmitTicketHandler =
  (isEditMode: boolean, updateBoard: (board: Board) => void, board?: Board) =>
  async (data: Ticket) => {
    if (!board) return;
    const newTickets = makeNewTickets(board, data, isEditMode);
    await updateBoard({ ...board, tickets: newTickets });
  };
const makeNewTickets = (board: Board, data: Ticket, isEditMode: boolean) => {
  const newTicket: Ticket = {
    ...data,
    id: data.id || new Guid().toString(),
    status: data.status || board.columns[0],
  };
  return [
    ...(isEditMode
      ? board.tickets.filter((t) => t.id !== data.id)
      : board.tickets),
    newTicket,
  ];
};
