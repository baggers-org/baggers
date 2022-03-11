export const addFieldToPosition = (positionsField: string, field: any) => ({
  $addFields: {
    positions: {
      $map: {
        input: positionsField,
        as: `pos`,
        in: {
          $mergeObjects: [`$$pos`, field],
        },
      },
    },
  },
});
