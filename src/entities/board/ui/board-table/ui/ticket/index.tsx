import { Draggable } from "react-beautiful-dnd";
import React, { useState } from "react";
import { BoardTicketParams } from "./types";
import { TicketWrapper } from "./styled";
import { Box, Typography } from "@mui/material";
import { TicketModal } from "@/entities/board";
import { Button, colors, Icon, TruncateText } from "@/shared/lib";

export const BoardTicket: React.FC<BoardTicketParams> = ({
  ticket,
  index,
  board,
}) => {
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  return (
    <>
      <Draggable key={ticket.id} draggableId={ticket.id} index={index}>
        {(provided) => (
          <TicketWrapper
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Typography
              component="div"
              color={
                ticket.type === "task" ? colors.green.light : colors.red.light
              }
              display="flex"
              alignItems="center"
              gap="5px"
            >
              <Icon name={ticket.type} size={18} />
              <TruncateText fontSize={20} maxWidth={200} component="span">
                {ticket.title}
              </TruncateText>
            </Typography>
            <Typography fontSize={18} color={colors.gray.light}>
              {ticket.description}
            </Typography>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="default"
                name="Details"
                onClick={() => setIsTicketModalOpen(true)}
              />
            </Box>
          </TicketWrapper>
        )}
      </Draggable>
      <TicketModal
        view={{ isView: true, viewTicket: ticket }}
        isOpen={isTicketModalOpen}
        setIsOpen={setIsTicketModalOpen}
        board={board}
      />
    </>
  );
};
