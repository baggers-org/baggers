// TODO: support other currencies
export const formatCurrency = (value: number, currency = `USD`) => {
  const Formatter = new Intl.NumberFormat(`en-US`, {
    style: `currency`,
    currency,
  });
  return Formatter.format(value);
};

/**
 *
 * Returns the currency security given the code
 * @param code The Currency code, e.g USD, GBP
 * @returns security - e.g $, £
 */
export const formatCurrencySecurity = (code?: string | null): string => {
  if (!code) {
    console.error(`formatCurrencySecurity - Failed to format `, code);
    return `$`;
  }
  const sym = new Intl.NumberFormat(`en-US`, {
    style: `currency`,
    currency: code,
  })
    ?.formatToParts(1)
    ?.find((part) => part.type === `currency`)?.value;

  if (!sym) {
    console.error(`formatCurrencySecurity - Failed to format `, code);
    return `$`;
  }

  return sym;
};

export const renderQuotePrice = (quote: any) =>
  `${formatCurrencySecurity(quote?.currency)}${quote.latestPrice}`;
