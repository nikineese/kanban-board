import { FieldValues, UseFormHandleSubmit } from "react-hook-form";

export type BoardModalParams<T> = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  form?: { isForm: boolean; handleSubmit?: UseFormHandleSubmit<FieldValues> };
  modalContent: JSX.Element;
  title: string;
  disabled?: boolean;
  onCancel?: () => void;
  onSubmit?: (data: T) => void;
  onClose?: () => void;
  submitTitle?: string;
  cancelTitle?: string;
  closeIfCancel?: boolean;
  isDataInvalid?: boolean;
  isPreventSubmit?: boolean;
};
