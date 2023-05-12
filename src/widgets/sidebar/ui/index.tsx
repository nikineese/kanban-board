import React from "react";
import { useGetSidebarState } from "@/entities/sidebar";
import { RecViewedBoard } from "./rec-viewed-board";
import { SidebarWrapper } from "./styled";
import { EmptyBoardsPlaceholder } from "./empty-boards-placeholder";
import { Typography } from "@mui/material";

export const Sidebar = () => {
  const { boards } = useGetSidebarState();
  return (
    <SidebarWrapper>
      <Typography fontSize={32}>Recently viewed</Typography>
      {boards.map((board) => (
        <RecViewedBoard key={board.id} board={board} />
      ))}
      {boards.length <= 0 && <EmptyBoardsPlaceholder />}
    </SidebarWrapper>
  );
};
