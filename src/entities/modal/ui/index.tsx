import React from "react";
import { BoardModalParams } from "../model";
import { Box, Modal, Typography } from "@mui/material";
import { ModalContentWrapper, ModalFormWrapper } from "./styled";
import { colors, Icon } from "@/shared/lib";
import { BoardActions } from "./modal-actions";

export const TitleActionsModal: React.FC<BoardModalParams<any>> = ({
  isOpen,
  setIsOpen,
  form = { isForm: false },
  title,
  modalContent,
  disabled,
  submitTitle,
  onSubmit,
  cancelTitle,
  onCancel,
  closeIfCancel = false,
  onClose,
}) => {
  const onCloseHandler = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };
  const onCancelHandler = () => {
    if (closeIfCancel) {
      setIsOpen(false);
    }
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <Modal open={isOpen} onClose={onCloseHandler}>
      <ModalContentWrapper>
        <Box display="flex" justifyContent="space-between">
          <Typography component="span" color={colors.gray.medium}>
            {title}
          </Typography>
          <Icon name="cross" size={30} onClick={onCloseHandler} />
        </Box>
        {form.isForm && form.handleSubmit && onSubmit ? (
          <ModalFormWrapper onSubmit={form.handleSubmit(onSubmit)}>
            {modalContent}
            <BoardActions
              onSubmit={onSubmit}
              onCancel={onCancelHandler}
              disabled={disabled}
              submitTitle={submitTitle}
              cancelTitle={cancelTitle}
            />
          </ModalFormWrapper>
        ) : (
          <>
            {modalContent}
            <BoardActions
              onSubmit={onSubmit}
              onCancel={onCancelHandler}
              disabled={disabled}
              submitTitle={submitTitle}
              cancelTitle={cancelTitle}
            />
          </>
        )}
      </ModalContentWrapper>
    </Modal>
  );
};
