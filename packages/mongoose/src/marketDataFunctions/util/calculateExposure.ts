const calculateExposure = (marketValue: number, portfolioCash: number) => {
  return (marketValue / portfolioCash) * 100;
};

export default calculateExposure;
