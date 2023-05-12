import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const TruncateText = styled(Typography)<{
  maxWidth: number;
  [k: string]: any;
}>`
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  ${({ maxWidth }) => `max-width:${maxWidth}px;`}
`;
