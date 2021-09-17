const calculateDailyProfitLossUsd = (
  numberOfShares: number,
  change: number,
) => {
  return numberOfShares * change;
};

export default calculateDailyProfitLossUsd;
