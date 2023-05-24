import { ModalMode } from "../../../../../model";
import { Board } from "../../../../../../../model";
export const makeOnRemoveBoardHandler =
  (removeBoard: (board: Board) => void, mode?: ModalMode<Board>) =>
  async () => {
    if (mode?.isModeEnabled && mode.modeData) {
      await removeBoard(mode.modeData);
      return;
    }
  };
