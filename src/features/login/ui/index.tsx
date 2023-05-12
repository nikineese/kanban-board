import { Box, Input, InputLabel, Typography } from "@mui/material";
import { Button, colors } from "@/shared/lib";
import { useState } from "react";
import { openBoard } from "@/entities/board-screen";
import { useDispatch } from "react-redux";
import { BoardModal } from "@/entities/board";

export const Login = () => {
  const dispatch = useDispatch();
  const [boardId, setBoardId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Box
        width="100%"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          gap="20px"
          padding="20px"
          borderRadius="10px"
          textAlign="center"
          minWidth="460px"
          minHeight="500px"
          boxShadow={`0px 0px 100px -20px ${colors.black.default}`}
        >
          <Button
            variant="default"
            scalePx={15}
            name="Create New Board"
            onClick={() => setIsModalOpen(true)}
          />
          <Typography>or</Typography>
          <InputLabel>Enter board ID</InputLabel>
          <Input
            color="primary"
            value={boardId}
            onChange={(e) => setBoardId(e.target.value)}
          />
          <Button
            type="submit"
            variant="default"
            scalePx={15}
            name="Join board by ID"
            onClick={(e) => {
              e.preventDefault();
              dispatch(openBoard(boardId));
            }}
          />
        </Box>
      </Box>
      <BoardModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
};
