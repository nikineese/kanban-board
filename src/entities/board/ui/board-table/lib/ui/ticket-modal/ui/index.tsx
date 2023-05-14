import { TitleActionsModal } from "@/entities/modal";
import React, { useEffect } from "react";
import { TicketModalParams } from "../model";
import { Controller, useForm } from "react-hook-form";
import { Box, Input, MenuItem, Select, Typography } from "@mui/material";
import { Ticket } from "../../../../model";
import { defaultTicket } from "../lib";
import { Guid } from "js-guid";
import { TextArea } from "./styled";
import { useUpdateBoardMutation } from "../../../../../../api";

export const TicketModal: React.FC<TicketModalParams> = ({
  view = { isView: false },
  isOpen,
  setIsOpen,
  board,
  ticketTypes,
}) => {
  const { register, control, reset, handleSubmit, formState } = useForm<Ticket>(
    {
      values: { ...(view.viewTicket || defaultTicket) },
    }
  );

  const [updateBoard, { isSuccess }] = useUpdateBoardMutation();

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
      resetForm();
    }
  }, [isSuccess]);

  const onSubmit = async (data: Ticket) => {
    if (board) {
      const newTicket: Ticket = {
        ...data,
        id: new Guid().toString(),
        status: board.columns[0],
      };
      updateBoard({ ...board, tickets: [...board.tickets, newTicket] });
    }
  };
  const resetForm = () => reset(defaultTicket);
  const onRemove = () => {
    if (board) {
      const ticketsWithoutRemoved = board?.tickets.filter(
        (t) => t.id !== view.viewTicket?.id
      );
      updateBoard({ ...board, tickets: ticketsWithoutRemoved });
    }
  };

  const createTicketProps = {
    title: "Create new ticket",
    submitTitle: "Create",
    cancelTitle: "Clear",
    onCancel: resetForm,
  };
  const viewTicketProps = {
    title: "View ticket",
    cancelTitle: "Remove",
    onCancel: onRemove,
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
            disabled={view.isView}
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
                    disabled={view.isView}
                  >
                    {view.isView && !ticketTypes?.length && (
                      <MenuItem value={view.viewTicket?.type}>
                        {view.viewTicket?.type}
                      </MenuItem>
                    )}
                    {ticketTypes?.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
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
                disabled={view.isView}
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
                disabled={view.isView}
              />
            </Box>
            <Box display="flex" gap="10px">
              <Typography component="span">Assigned Employee:</Typography>
              <Input
                type="text"
                {...register("assignedEmployee", { required: true })}
                disabled={view.isView}
              />
            </Box>
          </Box>
        </Box>
      }
      onClose={resetForm}
      closeIfCancel={view.isView}
      onSubmit={onSubmit}
      isDataInvalid={!formState.isValid}
      {...(!view.isView ? createTicketProps : viewTicketProps)}
    />
  );
};
