const calculateMarketValue = (positionSize: number, currentPrice: number) => {
  return positionSize * currentPrice;
};

export default calculateMarketValue;
