export const formatCurrency = (value: number, currency = `USD`) => {
  const Formatter = new Intl.NumberFormat(`en-US`, {
    style: `currency`,
    currency,
  });
  return Formatter.format(value);
};
