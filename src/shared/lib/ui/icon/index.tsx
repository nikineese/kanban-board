import React from "react";
import { IconParams } from "./types";
import Image from "next/image";
import { ImageAbsolute } from "./styled";
import { icons } from "../../";

export const Icon: React.FC<IconParams> = ({
  name,
  size,
  onClick,
  absolute = { isAbsolute: false, top: 0, left: 0, right: 0, bottom: 0 },
}) => {
  if (!absolute?.isAbsolute)
    return (
      <Image
        className="pointer"
        src={icons[name]}
        width={size}
        height={size}
        alt={name}
        onClick={onClick}
      />
    );
  return (
    <ImageAbsolute
      {...absolute.position}
      className="pointer"
      src={icons[name]}
      width={size}
      height={size}
      alt={name}
      onClick={onClick}
    />
  );
};
