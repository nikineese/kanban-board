import { DraggableLocation, DropResult } from "react-beautiful-dnd";
import { Board } from "../../../model";
import { convertTitleId } from "@/shared/lib";
import { mapTicketsPosition } from "../lib";
import { Column, Ticket } from "@/entities/board";

export const onDragEnd = (
  result: DropResult,
  board: Board,
  updateBoard: (board: Board) => void
) => {
  const newBoard = createBoardByDragDropResult(board, result);
  if (newBoard) {
    updateBoard(newBoard);
  }
};
const createBoardByDragDropResult = (
  board: Board,
  { destination, source, type, draggableId }: DropResult
): Board | undefined => {
  if (!destination) return;
  if (
    destination?.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  if (type === "columns") {
    const newColumnsWithMovedColumn = makeNewColumnsWithMovedColumn(
      board,
      source,
      destination,
      draggableId
    );
    return {
      ...board,
      columns: newColumnsWithMovedColumn,
    };
  }

  const columnsIds = board.columns.map((col) => col.id);
  const sourceCol = columnsIds.find((col) => col === source.droppableId);
  const destinationCol = columnsIds.find(
    (col) => col === destination.droppableId
  );
  const isSameColumn = sourceCol === destinationCol;

  if (isSameColumn) {
    const ticketsWithInsideMovedTicket = makeTicketsWithInsideMovedTicket(
      board.tickets,
      source.index,
      destination.index,
      sourceCol
    );

    const otherColumnsTickets = Array.from(
      board.tickets.filter((el) => el.status.id !== sourceCol)
    );

    return {
      ...board,
      tickets: [...ticketsWithInsideMovedTicket, ...otherColumnsTickets],
    };
  }

  const ticketsWithTicketMovedBetween = makeTicketsWithTicketMovedBetween(
    board.tickets,
    source,
    destination,
    sourceCol,
    destinationCol
  );

  const otherColumnsTickets = board.tickets.filter(
    (ticket) =>
      ticket.status.id !== sourceCol && ticket.status.id !== destinationCol
  );

  return {
    ...board,
    tickets: [...ticketsWithTicketMovedBetween, ...otherColumnsTickets],
  };
};

const makeNewColumnsWithMovedColumn = (
  board: Board,
  source: DraggableLocation,
  destination: DraggableLocation,
  draggableId: string
): Column[] => {
  const newColumnOrder = Array.from(board.columns);

  newColumnOrder.splice(source.index, 1);
  newColumnOrder.splice(destination!.index, 0, {
    id: draggableId,
    colName: convertTitleId(draggableId, "title"),
  });

  return newColumnOrder;
};

const makeTicketsWithInsideMovedTicket = (
  tickets: Ticket[],
  srcIdx: number,
  destIdx: number,
  sourceCol?: string
): Ticket[] => {
  const sourceColumnTickets = Array.from(
    tickets.filter((el) => el.status.id === sourceCol)
  );
  const draggedTicket = sourceColumnTickets[srcIdx];

  sourceColumnTickets.splice(srcIdx, 1);
  sourceColumnTickets.splice(destIdx, 0, draggedTicket);

  return mapTicketsPosition(sourceColumnTickets);
};

const makeTicketsWithTicketMovedBetween = (
  tickets: Ticket[],
  source: DraggableLocation,
  destination: DraggableLocation,
  sourceCol?: string,
  destinationCol?: string
) => {
  const sourceTickets = tickets.filter(
    (ticket) => ticket.status.id === sourceCol
  );
  const draggedTicket = sourceTickets[source.index];
  sourceTickets.splice(source.index, 1);

  const destinationTickets = tickets.filter(
    (ticket) => ticket.status.id === destinationCol
  );
  destinationTickets.splice(destination.index, 0, {
    ...draggedTicket,
    status: {
      id: destination.droppableId,
      colName: convertTitleId(destination.droppableId, "title"),
    },
  });

  return [
    ...mapTicketsPosition(sourceTickets),
    ...mapTicketsPosition(destinationTickets),
  ];
};
