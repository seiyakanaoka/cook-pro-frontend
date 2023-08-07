export const isNumberString = (value: string) => {
  const reg = new RegExp(/^[0-9]+/);
  return value.match(reg) !== null;
};
