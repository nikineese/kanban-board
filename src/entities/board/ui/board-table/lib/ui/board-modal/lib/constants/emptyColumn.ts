import { Column } from "../../../../../model";
import { convertTitleId } from "@/shared/lib";

export const emptyColumn: Column = {
  id: convertTitleId("New Column", "id"),
  colName: "New Column",
};
