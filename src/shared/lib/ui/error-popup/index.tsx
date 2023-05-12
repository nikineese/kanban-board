import React from "react";
import { ErrorPopupParams } from "./types";
import { Alert, Snackbar } from "@mui/material";
import { setError } from "@/entities/redux";
import { useDispatch } from "react-redux";

export const ErrorPopup: React.FC<ErrorPopupParams> = ({ error }) => {
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(setError({ ...error, isErrorPopupOpen: false }));
  };
  return (
    <Snackbar
      open={error.isErrorPopupOpen}
      onClose={onClose}
      autoHideDuration={6000}
    >
      <Alert onClose={onClose} severity="error">
        {error.message}
      </Alert>
    </Snackbar>
  );
};
