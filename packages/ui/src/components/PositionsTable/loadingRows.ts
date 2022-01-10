export const getLoadingRows = (numberOfRows: number) =>
  [...Array(numberOfRows)].map((x, index) => ({
    _id: `id_${index}`,
  }));
