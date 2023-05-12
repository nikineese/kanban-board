import styled from "@emotion/styled";

export const BoardTableWrapper = styled.div<{ columnsNumber: number }>`
  display: grid;
  width: 100%;
  gap: 5px;
  height: 100%;
  ${({ columnsNumber }) =>
    columnsNumber > 0
      ? `grid-template-columns: repeat(${columnsNumber},1fr);`
      : ""}
`;
