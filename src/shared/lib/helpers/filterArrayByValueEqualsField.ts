export function filterArrayByValueEqualsField<T, K extends keyof T>(
  val: string,
  arr: T[],
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
