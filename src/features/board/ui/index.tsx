import React, { useState } from "react";
import {
  BoardModal,
  useFetchBoardByIdQuery,
  useGetTicketTypesQuery,
} from "@/entities/board";
import { ClipboardText, Icon, Button } from "@/shared/lib";
import { Box, Typography } from "@mui/material";
import { BoardTable, TicketModal } from "@/entities/board";
import { Search } from "./search";
import { BoardParams } from "../model";
import { useDispatch } from "react-redux";
import { openLogin } from "@/entities/board-screen";

export const Board: React.FC<BoardParams> = ({ id }) => {
  const dispatch = useDispatch();
  const { currentData } = useFetchBoardByIdQuery(id);
  const { currentData: ticketTypes } = useGetTicketTypesQuery();

  const [isTicketModalOpen, setTicketModalOpen] = useState(false);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  if (currentData) {
    return (
      <>
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          padding="20px 10px"
          height="100vh"
          gap="20px"
        >
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap="15px">
              <Typography variant="h4" component="span">
                {currentData.title}
              </Typography>
              <ClipboardText text={currentData.id} />
            </Box>
            <Icon
              name="cross"
              size={30}
              onClick={() => dispatch(openLogin())}
            />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Search board={currentData} searchInData={currentData.tickets} />
            <Button
              variant="default"
              name="Edit board"
              onClick={() => setIsBoardModalOpen(true)}
            />
          </Box>
          <BoardTable
            board={currentData}
            setCreateTicketModalOpen={setTicketModalOpen}
          />
        </Box>
        {ticketTypes && (
          <TicketModal
            isOpen={isTicketModalOpen}
            setIsOpen={setTicketModalOpen}
            board={currentData}
            ticketTypes={ticketTypes}
          />
        )}
        {isBoardModalOpen && (
          <BoardModal
            isOpen={isBoardModalOpen}
            setIsOpen={setIsBoardModalOpen}
            edit={{ isEdit: true, editBoard: currentData }}
          />
        )}
      </>
    );
  }
  return null;
};
