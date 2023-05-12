export type ModalActions<T> = {
  cancelTitle?: string;
  onCancel?: () => void;
  submitTitle?: string;
  onSubmit?: (data: T) => void;
  disabled?: boolean;
};
