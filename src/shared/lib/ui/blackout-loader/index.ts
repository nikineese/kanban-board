import { colors } from "@/shared/lib";
import styled from "@emotion/styled";

export const BlackoutLoader = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${colors.gray.light};
  opacity: 0.5;
  z-index: 1;
  filter: blur(10px);
`;
