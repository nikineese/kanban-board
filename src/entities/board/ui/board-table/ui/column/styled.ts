import styled from "@emotion/styled";
import { colors } from "@/shared/lib";

export const TicketListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  overflow-y: auto;
  max-height: 80vh;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: ${colors.gray.lighter};
`;
export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
