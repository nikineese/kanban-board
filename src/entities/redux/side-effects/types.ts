import { ErrorMessages } from "@/shared/lib";

export type SideEffectsError = {
  isErrorPopupOpen: boolean;
  message?: ErrorMessages;
};

export type SideEffectsState = {
  error: SideEffectsError;
};
