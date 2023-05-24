import { Ticket, ModalMode } from "../../../../../model";
import { Board } from "../../../../../../../model";
export const makeOnRemoveTicketHandler =
  (
    updateBoard: (board: Board) => void,
    board?: Board,
    mode?: ModalMode<Ticket>
  ) =>
  async () => {
    if (!board) return;
    const ticketsWithoutRemoved = board.tickets.filter(
      (t) => t.id !== mode?.modeData?.id
    );
    await updateBoard({ ...board, tickets: ticketsWithoutRemoved });
  };
