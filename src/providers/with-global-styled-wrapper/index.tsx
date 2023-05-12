import React from "react";
import { GlobalWrapper } from "./styled";
export const withGlobalStyledWrapper =
  (Component: React.ComponentType) => () => {
    return (
      <GlobalWrapper>
        <Component />
      </GlobalWrapper>
    );
  };
