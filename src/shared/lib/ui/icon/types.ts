import { icons } from "../../";

export type IconParams = {
  name: keyof typeof icons;
  size: number;
  onClick?: () => void;
  absolute?: {
    isAbsolute: boolean;
    position: { top?: number; left?: number; right?: number; bottom?: number };
  };
};
