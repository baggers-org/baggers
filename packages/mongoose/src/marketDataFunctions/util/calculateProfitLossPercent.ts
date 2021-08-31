const calculateProfitLossPercent = (costBasis: number, marketValue: number) => {
  const pl = marketValue - costBasis;
  const percent = (pl / costBasis) * 100;

  return parseFloat(percent.toFixed(2));
};

export default calculateProfitLossPercent;
