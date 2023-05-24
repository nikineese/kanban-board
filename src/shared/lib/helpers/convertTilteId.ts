const convertStringTitleToId = (str: string) =>
  str.replace(" ", "_").toLowerCase();
const convertIdToStringTitle = (str: string) =>
  str
    .split("_")
    .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
    .join(" ");
export const convertTitleId = (str: string, to: "id" | "title") =>
  to === "title" ? convertIdToStringTitle(str) : convertStringTitleToId(str);
