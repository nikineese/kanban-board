import styled from "@emotion/styled";
import Image from "next/image";

export const ImageAbsolute = styled(Image)<{
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}>`
  position: absolute;
  ${({ top, left, right, bottom }) =>
    [
      { name: "top", val: top },
      { name: "left", val: left },
      { name: "right", val: right },
      { name: "bottom", val: bottom },
    ]
      .map(({ name, val }) =>
        typeof val === "number" ? `${name}:${val}px;` : ""
      )
      .join("")}
`;
