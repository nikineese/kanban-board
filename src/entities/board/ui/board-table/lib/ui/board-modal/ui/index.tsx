import React, { useEffect } from "react";
import {
  CreateBoardModalParams,
  makeOnCloseBoardHandler,
  makeOnRemoveBoardHandler,
  makeOnSubmitBoardHandler,
} from "../model";
import { TitleActionsModal } from "../../../../../../../modal";
import { useFieldArray, useForm } from "react-hook-form";
import { Box, Input, Typography } from "@mui/material";
import { Button, colors, Icon } from "@/shared/lib";
import {
  useCreateNewBoardMutation,
  useRemoveBoardMutation,
  useUpdateBoardMutation,
} from "../../../../../../api";
import { Board } from "../../../../../../model";
import { defaultBoard, emptyColumn, Field } from "../lib";

export const BoardModal: React.FC<CreateBoardModalParams> = ({
  isOpen,
  setIsOpen,
  edit,
}) => {
  const { register, control, handleSubmit, reset, formState } = useForm<Board>({
    values: { ...(edit?.modeData || defaultBoard) },
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

  const createBoardProps = {
    title: Field.CREATE_TITLE,
    submitTitle: Field.CREATE_SUBMIT,
    onClose: makeOnCloseBoardHandler(reset, edit),
  };
  const editBoardProps = {
    title: Field.EDIT_TITLE,
    submitTitle: Field.EDIT_SUBMIT,
    cancelTitle: Field.EDIT_CANCEL,
    onCancel: makeOnRemoveBoardHandler(removeBoard, edit),
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
      onSubmit={makeOnSubmitBoardHandler(createBoard, updateBoard, edit)}
      isDataInvalid={!formState.isValid}
      {...(!edit?.isModeEnabled ? createBoardProps : editBoardProps)}
    />
  );
};
