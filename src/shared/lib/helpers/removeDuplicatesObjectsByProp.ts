export function removeDuplicatesObjectsByProp<T, K>(
  data: T[],
  key: (element: T) => K
) {
  return [...new Map(data.map((x) => [key(x), x])).values()];
}
