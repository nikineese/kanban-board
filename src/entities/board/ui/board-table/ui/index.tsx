import { DragDropContext } from "react-beautiful-dnd";
import React from "react";
import { BoardTableParams } from "../model";
import { BoardColumn } from "./column";
import { BoardTableWrapper } from "./styled";
import { FixedStrictDroppable, BlackoutLoader } from "@/shared/lib";
import { useUpdateBoardMutation } from "../../../api";
import { onDragEnd } from "../model";
import { sortTicketsByPosition } from "../lib";

export const BoardTable: React.FC<BoardTableParams> = ({
  board,
  setCreateTicketModalOpen,
  ticketTypes,
}) => {
  const [updateBoard, { isLoading }] = useUpdateBoardMutation();
  const sortedTasksByPosition = sortTicketsByPosition(board.tickets);

  return (
    <DragDropContext
      onDragEnd={(result) =>
        onDragEnd(
          result,
          { ...board, tickets: sortedTasksByPosition },
          updateBoard
        )
      }
    >
      <FixedStrictDroppable
        droppableId="columns"
        direction="horizontal"
        type="columns"
      >
        {(provided) => (
          <BoardTableWrapper
            columnsNumber={board.columns.length}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {isLoading && <BlackoutLoader />}
            {board.columns.map((col, idx) => {
              return (
                <BoardColumn
                  key={col.id}
                  colId={col.id}
                  isColPosFirst={idx === 0}
                  column={col.colName}
                  index={idx}
                  board={board}
                  ticketTypes={ticketTypes}
                  setCreateTicketModalOpen={setCreateTicketModalOpen}
                />
              );
            })}
            {provided.placeholder}
          </BoardTableWrapper>
        )}
      </FixedStrictDroppable>
    </DragDropContext>
  );
};
