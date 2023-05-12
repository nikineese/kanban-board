import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const TypographyClipboard = styled(Typography)`
  user-select: none;
  :active {
    opacity: 0.5;
  }
`;
export const TruncateClipboard = styled.span`
  font-size: 18px;
  width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
