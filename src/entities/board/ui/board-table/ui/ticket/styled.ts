import styled from "@emotion/styled";
import { colors } from "@/shared/lib";

export const TicketWrapper = styled.div`
  width: 100%;
  min-height: 120px;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
`;

export const AddTicketWrapper = styled(TicketWrapper)`
  margin-top: auto;
  border: 1px solid ${colors.blue.light};
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    opacity: 0.8;
  }
  :active {
    transform: scale(0.98);
  }
`;
