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
  isDataInvalid = false,
  isPreventSubmit = false,
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

  const actionsProps = {
    onSubmit,
    onCancel: onCancelHandler,
    disabled,
    submitTitle,
    cancelTitle,
    isDataInvalid,
    isPreventSubmit,
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
            <BoardActions {...actionsProps} />
          </ModalFormWrapper>
        ) : (
          <>
            {modalContent}
            <BoardActions {...actionsProps} />
          </>
        )}
      </ModalContentWrapper>
    </Modal>
  );
};
