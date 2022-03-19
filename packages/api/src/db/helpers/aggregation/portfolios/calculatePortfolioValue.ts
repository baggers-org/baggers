export const calculatePortfolioTotalValue = (holdingsField = `holdings`) => [
  {
    $addFields: {
      totalValue: {
        $sum: `$${holdingsField}.marketValue`,
      },
    },
  },
];
