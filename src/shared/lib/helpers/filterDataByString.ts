export function filterDataByString<T>(data: T[], key: keyof T, str: string) {
  return data.filter((el) => {
    const v = el[key];
    if (typeof v === "string") {
      return v.toLowerCase().includes(str.toLowerCase());
    } else if (typeof v !== "object") {
      return String(v).toLowerCase().includes(str.toLowerCase());
    }
  });
}
