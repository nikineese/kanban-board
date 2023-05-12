export function filterArrayByElemKeyEqualsValue<T>(
  arr: T[],
  key: keyof T,
  val: string
) {
  return arr.filter((el) => {
    return el[key] === val;
  });
}
