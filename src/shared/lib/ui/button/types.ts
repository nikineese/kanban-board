import { MouseEventHandler } from "react";

export type ButtonType = "default" | "danger";

export type ButtonParams = {
  variant: ButtonType;
  name: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  scalePx?: number;
  [k: string]: any;
};
