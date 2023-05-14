export function filterArrayByElemKeyEqualsValue<T, K extends keyof T>(
  arr: T[],
  val: string,
  key: K,
  objPropKey?: keyof T[K]
) {
  return arr.filter((el) => {
    if (!objPropKey) {
      return el[key] === val;
    }
    return el[key][objPropKey] === val;
  });
}
