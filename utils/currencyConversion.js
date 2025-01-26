export const convertCurrency = (amount, fromCurrency, toCurrency, exchangeRates) => {
  if (fromCurrency === toCurrency) return amount;

  if (!exchangeRates || !exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
    console.error(`Conversion rate not available for ${fromCurrency} to ${toCurrency}`);
    return amount;
  }

  if (amount === 0) return 0;

  const amountByDefault = amount / exchangeRates[fromCurrency];
  const convertedAmount = amountByDefault * exchangeRates[toCurrency];

  return parseFloat(convertedAmount.toFixed(2));
};