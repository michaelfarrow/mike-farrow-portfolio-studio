export function join(a: any[], seperator = ' ') {
  return a
    .filter((item) => !!item)
    .map((item) => String(item))
    .join(seperator);
}
