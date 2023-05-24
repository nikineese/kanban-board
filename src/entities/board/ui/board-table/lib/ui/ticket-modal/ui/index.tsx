import { TitleActionsModal } from "@/entities/modal";
import React, { useEffect, useState } from "react";
import {
  makeOnRemoveTicketHandler,
  makeOnSubmitTicketHandler,
  makeTurnOnEditModeHandler,
  TicketModalParams,
} from "../model";
import { Controller, useForm } from "react-hook-form";
import { Box, Input, MenuItem, Select, Typography } from "@mui/material";
import { Ticket } from "../../../../model";
import { defaultTicket, Field } from "../lib";
import { TextArea } from "./styled";
import { useUpdateBoardMutation } from "../../../../../../api";

export const TicketModal: React.FC<TicketModalParams> = ({
  view,
  isOpen,
  setIsOpen,
  board,
  ticketTypes,
}) => {
  const { register, control, reset, handleSubmit, formState } = useForm<Ticket>(
    {
      values: { ...(view?.modeData || defaultTicket) },
    }
  );

  const [updateBoard, { isSuccess }] = useUpdateBoardMutation();

  const [mode, setMode] = useState(view);

  const isEditMode = !mode?.isModeEnabled && !!mode?.modeData;

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
      resetModal();
    }
  }, [isSuccess]);

  const resetModal = () => {
    reset(defaultTicket);
    setMode(view);
  };

  const createTicketProps = {
    title: Field.CREATE_TITLE,
    submitTitle: Field.CREATE_SUBMIT,
    cancelTitle: Field.CREATE_CANCEL,
    onCancel: resetModal,
  };
  const editTicketProps = {
    title: Field.EDIT_TITLE,
    submitTitle: Field.EDIT_SUBMIT,
    cancelTitle: Field.EDIT_CANCEL,
  };
  const viewTicketProps = {
    title: Field.VIEW_TITLE,
    submitTitle: Field.VIEW_SUBMIT,
    cancelTitle: Field.VIEW_CANCEL,
    onSubmit: makeTurnOnEditModeHandler(setMode, mode),
    onCancel: makeOnRemoveTicketHandler(updateBoard, board, view),
  };

  return (
    <TitleActionsModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      form={{ isForm: true, handleSubmit }}
      modalContent={
        <Box display="flex" flexDirection="column" gap="40px">
          <Input
            placeholder="Task title..."
            {...register("title", { required: true })}
            disabled={mode?.isModeEnabled}
          />
          <Box display="flex" flexDirection="column" gap="20px">
            <Box display="flex" gap="10px" alignItems="center">
              <Typography component="span">Type:</Typography>
              <Controller
                control={control}
                render={({ field }) => (
                  <Select
                    size="small"
                    color="info"
                    {...field}
                    disabled={mode?.isModeEnabled}
                  >
                    {ticketTypes?.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                    {view?.isModeEnabled && !ticketTypes?.length && (
                      <MenuItem value={view.modeData?.type}>
                        {view?.modeData?.type}
                      </MenuItem>
                    )}
                  </Select>
                )}
                name="type"
              />
            </Box>
            <Box display="flex" flexDirection="column" gap="10px">
              <Typography component="span">Description:</Typography>
              <TextArea
                minRows={6}
                maxRows={6}
                placeholder="Add a description..."
                {...register("description", { required: true })}
                disabled={mode?.isModeEnabled}
              />
            </Box>
            <Box display="flex" gap="10px">
              <Typography component="span">Expected hours:</Typography>
              <Input
                type="number"
                {...register("expectedHours", {
                  required: true,
                  valueAsNumber: true,
                })}
                disabled={mode?.isModeEnabled}
              />
            </Box>
            <Box display="flex" gap="10px">
              <Typography component="span">Assigned Employee:</Typography>
              <Input
                type="text"
                {...register("assignedEmployee", { required: true })}
                disabled={mode?.isModeEnabled}
              />
            </Box>
          </Box>
        </Box>
      }
      isPreventSubmit={isEditMode}
      onClose={resetModal}
      closeIfCancel={mode?.isModeEnabled}
      onSubmit={makeOnSubmitTicketHandler(isEditMode, updateBoard, board)}
      isDataInvalid={!formState.isValid}
      {...(!mode?.isModeEnabled
        ? isEditMode
          ? editTicketProps
          : createTicketProps
        : viewTicketProps)}
    />
  );
};
