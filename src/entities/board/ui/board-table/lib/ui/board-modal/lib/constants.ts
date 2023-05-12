import { Board, Column } from "@/entities/board";
import { convertTitleId } from "@/shared/lib";

export const emptyColumn: Column = {
  id: convertTitleId("New Column", "title"),
  colName: "New Column",
};
export const defaultBoard: Board = {
  title: "",
  id: "",
  tickets: [],
  columns: [],
};
