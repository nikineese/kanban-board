import React from "react";
import { RecViewedBoardParams } from "../model";
import { Box } from "@mui/material";
import {
  Button,
  ClipboardText,
  colors,
  Icon,
  TruncateText,
} from "@/shared/lib";
import { removeBoardFromRecViewed } from "@/entities/sidebar";
import { useDispatch } from "react-redux";
import { openBoard } from "@/entities/board-screen";

export const RecViewedBoard: React.FC<RecViewedBoardParams> = ({ board }) => {
  const dispatch = useDispatch();
  return (
    <Box
      display="flex"
      position="relative"
      borderBottom={`1px solid ${colors.blue.light}`}
      gap="40px"
      minHeight="108px"
      width="100%"
    >
      <Box
        display="flex"
        flexDirection="column"
        gap="10px"
        paddingBottom="15px"
      >
        <Box
          display="flex"
          alignItems="center"
          height="fit-content"
          paddingTop="15px"
          gap="10px"
          onClick={(e) => e.stopPropagation()}
        >
          <TruncateText
            maxWidth={100}
            component="span"
            fontSize={20}
            color={colors.gray.medium}
          >
            {board.title}
          </TruncateText>
          <ClipboardText text={board.id} />
        </Box>
        <Button
          variant="default"
          name="Open"
          onClick={() => {
            dispatch(openBoard(board.id));
          }}
        />
      </Box>
      <Icon
        name="cross"
        size={30}
        onClick={() => dispatch(removeBoardFromRecViewed(board.id))}
        absolute={{
          isAbsolute: true,
          position: { top: 10, right: 10 },
        }}
      />
    </Box>
  );
};
