import { DropResult } from "react-beautiful-dnd";
import { Board } from "../../../model";
import { convertTitleId } from "@/shared/lib";
import { mapTicketsByPositionIndex } from "../lib";

export const onDragEnd = (
  result: DropResult,
  board: Board,
  updateBoard: (board: Board) => void
) => {
  const { destination, source } = result;
  if (
    destination?.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }
  const boardColumnsIds = board.columns.map((col) => col.id);
  const newBoard = changeBoardByDragDrop(boardColumnsIds, board, result);
  if (newBoard) {
    updateBoard(newBoard);
  }
  return;
};
const changeBoardByDragDrop = (
  columns: string[],
  board: Board,
  { destination, source, type, draggableId }: DropResult
): Board | undefined => {
  if (!destination) return;
  if (type === "columns") {
    const newColumnOrder = Array.from(board.columns);
    newColumnOrder.splice(source.index, 1);
    newColumnOrder.splice(destination.index, 0, {
      id: draggableId,
      colName: convertTitleId(draggableId, "id"),
    });

    return {
      ...board,
      columns: newColumnOrder,
    };
  }
  const sourceCol = columns.find((col) => col === source.droppableId);
  const destinationCol = columns.find((col) => col === destination.droppableId);
  if (sourceCol === destinationCol) {
    const sourceColTickets = Array.from(
      board.tickets.filter((el) => el.status === sourceCol)
    );
    const otherColumnsTickets = Array.from(
      board.tickets.filter((el) => el.status !== sourceCol)
    );
    const draggedTask = sourceColTickets[source.index];
    if (draggedTask) {
      sourceColTickets.splice(source.index, 1);
      sourceColTickets.splice(destination.index, 0, draggedTask);
      return {
        ...board,
        tickets: [
          ...mapTicketsByPositionIndex(sourceColTickets),
          ...otherColumnsTickets,
        ],
      };
    }
    return;
  }
  const tickets = Array.from(board.tickets);
  const sourceTickets = mapTicketsByPositionIndex(
    tickets.filter((ticket) => ticket.status === sourceCol)
  );
  const newTicket = sourceTickets[source.index];
  sourceTickets.splice(source.index, 1);
  const destinationTickets = tickets.filter(
    (ticket) => ticket.status === destinationCol
  );
  destinationTickets.splice(destination.index, 0, {
    ...newTicket,
    status: destination.droppableId,
  });

  const sortedByPosDestinationTickets =
    mapTicketsByPositionIndex(destinationTickets);
  const otherColumnsTickets = tickets.filter(
    (ticket) => ticket.status !== sourceCol && ticket.status !== destinationCol
  );
  return {
    ...board,
    tickets: [
      ...sourceTickets,
      ...sortedByPosDestinationTickets,
      ...otherColumnsTickets,
    ],
  };
};
