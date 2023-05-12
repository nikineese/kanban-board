import { TruncateClipboard, TypographyClipboard } from "./styled";
import { colors, Icon } from "@/shared/lib";
import React from "react";
import { ClipboardTextParams } from "./types";

export const ClipboardText: React.FC<ClipboardTextParams> = ({ text }) => {
  return (
    <TypographyClipboard
      className="pointer"
      display="flex"
      alignItems="center"
      gap="5px"
      color={colors.gray.light}
      onClick={() => navigator.clipboard.writeText(text)}
    >
      <Icon name="clipboard" size={15} />
      <TruncateClipboard>{text}</TruncateClipboard>
    </TypographyClipboard>
  );
};
