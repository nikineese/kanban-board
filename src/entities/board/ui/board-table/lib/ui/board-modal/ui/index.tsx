import React, { useEffect } from "react";
import { CreateBoardModalParams } from "../model";
import { TitleActionsModal } from "@/entities/modal";
import { useFieldArray, useForm } from "react-hook-form";
import { Box, Input, Typography } from "@mui/material";
import { Button, colors, convertTitleId, Icon } from "@/shared/lib";
import {
  Board,
  useCreateNewBoardMutation,
  useRemoveBoardMutation,
  useUpdateBoardMutation,
} from "@/entities/board";
import { Guid } from "js-guid";
import { defaultBoard, emptyColumn } from "../lib";

export const BoardModal: React.FC<CreateBoardModalParams> = ({
  isOpen,
  setIsOpen,
  edit = { isEdit: false },
}) => {
  const { register, control, handleSubmit, reset } = useForm<Board>({
    values: { ...(edit.editBoard || defaultBoard) },
    shouldUnregister: true,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const [createBoard, { isLoading, isSuccess: isCreateBoardSuccess }] =
    useCreateNewBoardMutation();
  const [updateBoard, { isSuccess: isUpdateBoardSuccess }] =
    useUpdateBoardMutation();
  const [removeBoard] = useRemoveBoardMutation();

  useEffect(() => {
    if (isCreateBoardSuccess || isUpdateBoardSuccess) {
      setIsOpen(false);
    }
  }, [isCreateBoardSuccess, isUpdateBoardSuccess]);

  const onSubmit = async (data: Board) => {
    const newBoard: Board = {
      ...data,
      id: edit.editBoard?.id || Guid.newGuid().toString(),
      tickets: edit.editBoard?.tickets || [],
      columns: data.columns?.map((col) => ({
        ...col,
        id: convertTitleId(col.colName, "title"),
      })),
    };
    if (edit.isEdit) {
      await updateBoard(newBoard);
      return;
    }
    await createBoard(newBoard);
  };
  const onRemoveBoard = async () => {
    if (edit.isEdit && edit.editBoard) {
      await removeBoard(edit.editBoard);
      return;
    }
  };
  const onClose = () => {
    if (edit.isEdit && edit.editBoard) {
      reset(edit.editBoard);
    }
  };

  const createBoardProps = {
    title: "Create new board",
    submitTitle: "Create",
    onClose: onClose,
  };
  const editBoardProps = {
    title: "Edit board",
    submitTitle: "Save",
    cancelTitle: "Remove board",
    onCancel: onRemoveBoard,
  };

  return (
    <TitleActionsModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      form={{ isForm: true, handleSubmit: handleSubmit }}
      modalContent={
        <Box display="flex" flexDirection="column" gap="20px">
          <Box display="flex" gap="10px" alignItems="center">
            <Typography component="span">Title:</Typography>
            <Input {...register("title", { required: "Title is required" })} />
          </Box>
          <Box display="flex" gap="10px" flexDirection="column">
            <Typography component="span">Columns:</Typography>
            <Button
              type="button"
              variant="default"
              name="+"
              onClick={() => append(emptyColumn)}
            />
            <Box
              display="flex"
              flexDirection="column"
              gap="15px"
              padding="20px"
              border={`1px solid ${colors.black.default}`}
              maxWidth="40%"
              borderRadius="10px"
              maxHeight="350px"
              overflow="auto"
            >
              {fields.map((field, index) => (
                <Box key={field.id} display="flex" gap="10px">
                  <Input {...register(`columns.${index}.colName` as const)} />
                  <Icon name="cross" size={18} onClick={() => remove(index)} />
                </Box>
              ))}
              {fields.length <= 0 && (
                <Typography component="span" color={colors.gray.light}>
                  No columns added yet
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      }
      disabled={isLoading}
      onSubmit={onSubmit}
      {...(!edit.isEdit ? createBoardProps : editBoardProps)}
    />
  );
};
