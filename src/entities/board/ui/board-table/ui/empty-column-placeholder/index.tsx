import { Box, Typography } from "@mui/material";
import { colors } from "@/shared/lib";

export const EmptyColumnPlaceholder = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Typography
        color={colors.gray.medium}
        variant="subtitle1"
        component="span"
      >
        No tickets to show
      </Typography>
    </Box>
  );
};
