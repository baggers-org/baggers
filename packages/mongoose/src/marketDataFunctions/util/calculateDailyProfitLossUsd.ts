const calculateDailyProfitLossUsd = (positionSize: number, change: number) => {
  return positionSize * change;
};

export default calculateDailyProfitLossUsd;
