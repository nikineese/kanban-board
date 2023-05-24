import { ModalMode } from "../../../../../model";
import { Board } from "../../../../../../../model";

export const makeOnCloseBoardHandler =
  (reset: (board: Board) => void, mode?: ModalMode<Board>) => () => {
    if (mode?.isModeEnabled && mode.isModeEnabled) {
      reset(mode.modeData);
    }
  };
