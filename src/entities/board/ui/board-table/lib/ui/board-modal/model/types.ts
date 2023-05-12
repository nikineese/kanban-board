import { Board } from "../../../../../../model";

export type CreateBoardModalParams = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  edit?: { isEdit: boolean; editBoard?: Board };
};
