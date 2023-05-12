import { Button } from "@/shared/lib";
import { Box } from "@mui/material";
import React from "react";
import { ModalActions } from "./types";

export const BoardActions: React.FC<ModalActions<any>> = ({
  cancelTitle,
  onCancel,
  submitTitle,
  onSubmit,
  disabled,
  isDataInvalid,
}) => {
  return (
    <Box
      display="flex"
      marginTop="auto"
      justifyContent={cancelTitle && submitTitle ? "space-between" : "flex-end"}
    >
      {cancelTitle && (
        <Button
          type="default"
          variant="danger"
          name={cancelTitle}
          scalePx={10}
          onClick={onCancel}
          disabled={disabled}
        />
      )}
      {submitTitle && (
        <Button
          type="submit"
          variant="default"
          scalePx={10}
          name={submitTitle}
          onClick={onSubmit}
          disabled={isDataInvalid || disabled}
        />
      )}
    </Box>
  );
};
