import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { localStorageInstance } from "../../config";
import { LSKeys } from "../../lib";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export function usePreloadLSData<T>(
  key: LSKeys,
  action: ActionCreatorWithPayload<T | null>
) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(action(localStorageInstance.get(key)));
    }
  }, []);
}
