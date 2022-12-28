export const formatNumber = (value: number) => {
  const Formatter = new Intl.NumberFormat(`en-US`);
  return Formatter.format(value);
};
