import { Box, Typography } from "@mui/material";
import { colors } from "@/shared/lib";

export const EmptyBoardsPlaceholder = () => {
  return (
    <Box width="100%">
      <Typography color={colors.gray.light} variant="h6" textAlign="center">
        You are not have any recently viewed boards
      </Typography>
    </Box>
  );
};
