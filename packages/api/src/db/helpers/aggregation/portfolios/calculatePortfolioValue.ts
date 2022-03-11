export const calculatePortfolioValue = (positionsField = `positions`) => ({
  $addFields: {
    totalValue: {
      $sum: `$${positionsField}.marketValue`,
    },
  },
});
