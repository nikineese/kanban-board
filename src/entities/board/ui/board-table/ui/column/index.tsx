import { BoardColumnParams } from "./types";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { BoardTicket } from "../ticket";
import { ColumnWrapper, TicketListWrapper } from "./styled";
import {
  FixedStrictDroppable,
  filterArrayByValueEqualsField,
  Icon,
} from "@/shared/lib";
import { EmptyColumnPlaceholder } from "../empty-column-placeholder";
import { Typography } from "@mui/material";
import { AddTicketWrapper } from "../ticket/styled";

export const BoardColumn: React.FC<BoardColumnParams> = ({
  colId,
  column,
  index,
  board,
  isColPosFirst,
  setCreateTicketModalOpen,
  ticketTypes,
}) => {
  const filteredTickets = filterArrayByValueEqualsField(
    colId,
    board.tickets,
    "status",
    "id"
  );

  return (
    <Draggable draggableId={colId} index={index}>
      {(provided) => (
        <ColumnWrapper ref={provided.innerRef} {...provided.draggableProps}>
          <Typography component="span" {...provided.dragHandleProps}>
            {column}
          </Typography>
          <FixedStrictDroppable droppableId={colId}>
            {(provided) => (
              <TicketListWrapper
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {filteredTickets.map((ticket, index) => {
                  return (
                    <BoardTicket
                      key={ticket.id}
                      board={board}
                      ticket={ticket}
                      index={index}
                      ticketTypes={ticketTypes}
                    />
                  );
                })}
                {filteredTickets.length <= 0 && <EmptyColumnPlaceholder />}
                {isColPosFirst && (
                  <AddTicketWrapper
                    key="add_ticket"
                    onClick={() => setCreateTicketModalOpen(true)}
                  >
                    <Icon name="plus" size={50} />
                  </AddTicketWrapper>
                )}
              </TicketListWrapper>
            )}
          </FixedStrictDroppable>
        </ColumnWrapper>
      )}
    </Draggable>
  );
};
