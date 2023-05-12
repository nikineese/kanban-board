import styled from "@emotion/styled";
import { colors } from "../../constants";
import { ButtonType } from "./types";

export const ButtonWrapper = styled.button<{
  btnType: ButtonType;
  scale?: number;
}>`
  width: fit-content;
  height: fit-content;
  padding: 5px 10px;
  cursor: pointer;
  min-width: 60px;
  background-color: #fff;
  border-radius: 5px;
  transition: all linear 0.1s;
  :active {
    opacity: 0.6;
  }
  ${({ scale }) => (scale ? `padding: ${scale}px ${10 + scale}px;` : "")}
  ${({ btnType }: { btnType: ButtonType }) => {
    switch (btnType) {
      case "default":
        return `color: ${colors.blue.light};
            border: 1px solid ${colors.blue.light}
        `;
      case "danger":
        return `color: ${colors.red.light};
            border: 1px solid ${colors.red.light}
        `;
      default:
        return "";
    }
  }}
`;
