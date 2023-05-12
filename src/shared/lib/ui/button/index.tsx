import { ButtonWrapper } from "./styled";
import React from "react";
import { ButtonParams } from "./types";

export const Button: React.FC<ButtonParams> = ({
  variant,
  name,
  scalePx,
  onClick,
  ...rest
}) => {
  return (
    <ButtonWrapper
      onClick={onClick}
      btnType={variant}
      scale={scalePx}
      {...rest}
    >
      {name}
    </ButtonWrapper>
  );
};
