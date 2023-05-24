import { Board } from "../../../../../../model";
import { ModalMode } from "../../../../model";

export type CreateBoardModalParams = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  edit?: ModalMode<Board>;
};
