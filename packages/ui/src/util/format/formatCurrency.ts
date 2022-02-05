const USMoneyFormatter = new Intl.NumberFormat(`en-US`, {
  style: `currency`,
  currency: `USD`,
});

// TODO: support other currencies
export const formatCurrency = (value: number) => {
  return USMoneyFormatter.format(value);
};
