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
 * Returns the currency symbol given the code
 * @param code The Currency code, e.g USD, GBP
 * @returns symbol - e.g $, £
 */
export const formatCurrencySymbol = (code?: string | null): string => {
  if (!code) {
    console.error(`formatCurrencySymbol - Failed to format `, code);
    return `$`;
  }
  const sym = new Intl.NumberFormat(`en-US`, {
    style: `currency`,
    currency: code,
  })
    ?.formatToParts(1)
    ?.find((part) => part.type === `currency`)?.value;

  if (!sym) {
    console.error(`formatCurrencySymbol - Failed to format `, code);
    return `$`;
  }

  return sym;
};

export const renderQuotePrice = (quote: any) =>
  `${formatCurrencySymbol(quote?.currency)}${quote.latestPrice}`;
