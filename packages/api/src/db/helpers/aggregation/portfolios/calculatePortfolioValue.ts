export const calculatePortfolioValue = (holdingsField = `holdings`) => ({
  $addFields: {
    totalValue: {
      $sum: `$${holdingsField}.marketValue`,
    },
  },
});
