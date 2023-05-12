import { LSKeys } from "../../lib";

export const localStorageInstance = {
  get<T>(key: LSKeys): T | null {
    try {
      return JSON.parse(localStorage.getItem(key) || "");
    } catch {
      return null;
    }
  },
  set<T>(key: LSKeys, data: T) {
    const strData = JSON.stringify(data);
    if (!strData || !key) return;
    try {
      localStorage.setItem(key, strData);
    } catch {
      throw new Error("Your boards view data wasn't saved");
    }
  },
};
