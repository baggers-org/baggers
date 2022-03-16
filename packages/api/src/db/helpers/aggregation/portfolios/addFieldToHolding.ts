export const addFieldToHolding = (holdingsField: string, field: any) => ({
  $addFields: {
    holdings: {
      $map: {
        input: holdingsField,
        as: `pos`,
        in: {
          $mergeObjects: [`$$pos`, field],
        },
      },
    },
  },
});
