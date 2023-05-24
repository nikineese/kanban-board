import { ModalMode } from "../../../../../model";
import { Board } from "../../../../../../../model";
import { Guid } from "js-guid";
import { convertTitleId } from "@/shared/lib";

export const makeOnSubmitBoardHandler =
  (
    createBoard: (board: Board) => void,
    updateBoard: (board: Board) => void,
    mode?: ModalMode<Board>
  ) =>
  async (data: Board) => {
    const newBoard: Board = makeNewBoard(data, mode);
    if (mode?.isModeEnabled) {
      await updateBoard(newBoard);
      return;
    }
    await createBoard(newBoard);
  };
const makeNewBoard = (data: Board, edit?: ModalMode<Board>) => ({
  ...data,
  id: edit?.modeData?.id || Guid.newGuid().toString(),
  tickets: edit?.modeData?.tickets || [],
  columns: data.columns?.map((col) => ({
    ...col,
    id: convertTitleId(col.colName, "id"),
  })),
});
