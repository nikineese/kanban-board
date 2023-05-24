import { Ticket, ModalMode } from "../../../../../model";

export const makeTurnOnEditModeHandler =
  (setMode: (mode?: ModalMode<Ticket>) => void, mode?: ModalMode<Ticket>) =>
  () => {
    setMode(mode && { ...mode, isModeEnabled: false });
  };
